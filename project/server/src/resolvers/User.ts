import argon2 from 'argon2'

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
}
