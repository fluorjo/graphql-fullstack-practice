import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class Director {
  @Field(() => Int, { description: '감독 고유 아이디' })
  id: number

  @Field(() => String, { description: '감독 이름' })
  name: string
}
