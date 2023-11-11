import { Field, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number

  @Field({ description: '유저 이름' })
  @Column({ unique: true, comment: '유저 이름' })
  username!: string

  @Field({ description: '유저 email' })
  @Column({ unique: true, comment: '유저 email' })
  email!: string

  @Column({ comment: 'password' })
  password: string

  @Field(() => String, { description: '생성 일자' })
  @CreateDateColumn({ comment: '생성 일자' })
  createdAt: Date

  @Field(() => String, { description: 'update 일자' })
  @UpdateDateColumn({ comment: 'update 일자' })
  updatedAt: Date
}
