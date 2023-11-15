import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

import {
  createAccessToken,
  createRefreshToken,
  REFRESH_JWT_SECRET_KEY,
  setRefreshTokenHeader,
  //setRefreshTokenHeader,
} from '../utils/jwt-auth'
import User from '../entities/User'
import { IsEmail, IsString } from 'class-validator'
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import { MyContext } from '../apollo/createApolloServer'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import redis from '../redis/redis-client'

@InputType()
export class SignUpInput {
  @Field() @IsEmail() email: string
  @Field() @IsString() username: string
  @Field() @IsString() password: string
}

@InputType({ description: 'Login input data' })
export class LoginInput {
  @Field() @IsString() emailOrUsername: string
  @Field() @IsString() password: string
}

@ObjectType({ description: 'Field error type' })
class FieldError {
  @Field() field: string
  @Field() message: string
}

@ObjectType({ description: 'Login reponse data' })
class LoginResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User

  @Field({ nullable: true })
  accessToken?: string
}

@ObjectType({ description: 'Refresh access token reponse data' })
class RefreshAccessTokenResponse {
  @Field() accessToken: string
}

@Resolver(User)
export class UserResolver {
  @UseMiddleware(isAuthenticated)
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    if (!ctx.verifiedUser) return undefined
    return User.findOne({ where: { id: ctx.verifiedUser.userId } })
  }
  @Mutation(() => User)
  async signUp(@Arg('signUpInput') signUpInput: SignUpInput): Promise<User> {
    const { email, username, password } = signUpInput
    const hashedPw = await argon2.hash(password)
    const newUser = User.create({
      email,
      username,
      password: hashedPw,
    })
    await User.insert(newUser)
    return newUser
  }

  @Mutation(() => LoginResponse)
  public async login(
    @Arg('loginInput') loginInput: LoginInput,
    @Ctx() { res, redis }: MyContext,
  ): Promise<LoginResponse> {
    const { emailOrUsername, password } = loginInput

    const user = await User.findOne({
      where: [{ email: emailOrUsername }, { username: emailOrUsername }],
    })
    if (!user)
      return {
        errors: [
          { field: 'emailOrUsername', message: 'no matching user found' },
        ],
      }

    const isValid = await argon2.verify(user.password, password)
    if (!isValid)
      return {
        errors: [{ field: 'password', message: 'please check password' }],
      }

    // 엑세스, 리프레쉬  토큰 발급
    const accessToken = createAccessToken(user)
    const refreshToken = createRefreshToken(user)
    // 리프레쉬 토큰 레디스 적재
    await redis.set(String(user.id), refreshToken)
    // 쿠키로 리프레쉬 토큰 전송
    setRefreshTokenHeader(res, refreshToken)

    return { user, accessToken }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async logout(
    @Ctx() { verifiedUser, res, redis }: MyContext,
  ): Promise<Boolean> {
    if (verifiedUser) {
      setRefreshTokenHeader(res, '')
      await redis.del(String(verifiedUser.userId))
    }
    return true
  }

  @Mutation(() => RefreshAccessTokenResponse, { nullable: true })
  async refreshAccessToken(
    @Ctx() { req, redis, res }: MyContext,
  ): Promise<RefreshAccessTokenResponse | null> {
    const refreshToken = req.cookies.refreshtoken
    if (!refreshToken) return null

    let tokenData: any = null
    try {
      tokenData = jwt.verify(refreshToken, REFRESH_JWT_SECRET_KEY)
    } catch (e) {
      console.error(e)
      return null
    }
    if (!tokenData) return null

    // redis에 user.id로 저장된 토큰 조회
    const storedRefreshToken = await redis.get(String(tokenData.userId))
    if (!storedRefreshToken) return null
    if (!(storedRefreshToken === refreshToken)) return null
    const user = await User.findOne({ where: { id: tokenData.userId } })
    if (!user) return null

    const newAccessToken = createAccessToken(user)
    const newRefreshToken = createRefreshToken(user)
    // refreshtoken을 redis에 저장
    await redis.set(String(user.id), newRefreshToken)

    //쿠키로 리프레쉬 토큰 전송
    res.cookie('refreshtoken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    })
    return { accessToken: newAccessToken }
  }
}
