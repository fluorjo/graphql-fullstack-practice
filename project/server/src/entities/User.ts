import { Field, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { CutVote } from './Cutvote'
import { CutReview } from './CutReview'
import Notification from './Notification'

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

  @OneToMany(() => CutVote, (cutVote) => cutVote.user)
  cutVotes: CutVote[]

  @OneToMany(() => CutReview, (cutReview) => cutReview.user)
  cutReviews: CutReview[]

  @OneToMany(() => Notification, (noti) => noti.user)
  notifications: Notification[]

  @Column({ comment: '프로필 사진 경로', nullable: true })
  @Field({ description: '프로필 사진 경로', nullable: true })
  profileImage: string
}
