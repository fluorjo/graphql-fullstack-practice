import argon2 from 'argon2'
import {
  createAccessToken,
  // createRefreshToken,
  // REFRESH_JWT_SECRET_KEY,
  // setRefreshTokenHeader,
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

// @ObjectType({ description: 'Refresh access token reponse data' })
// class RefreshAccessTokenResponse {
//   @Field() accessToken: string
// }

@Resolver(User)
export class UserResolver {
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
    //@Ctx() { res, redis }: MyContext,
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

    const accessToken = createAccessToken(user)

    return { user, accessToken }
    // 엑세스 토큰 발급
  }
}
