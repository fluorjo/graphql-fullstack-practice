import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  Resolver,
  ResolverInterface,
  Root,
  UseMiddleware,
} from 'type-graphql'
import { CutReview } from '../entities/CutReview'
import { IsInt, IsString } from 'class-validator'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import { MyContext } from '../apollo/createApolloServer'
import User from '../entities/User'

@InputType()
class CreateOrUpdateCutReviewInput {
  @Field(() => Int, { description: '명장면 번호' })
  @IsInt()
  cutId: number

  @Field({ description: '감상평 내용' })
  @IsString()
  contents: string
}

@Resolver(CutReview)
export class CutReviewResolver {
  @Mutation(() => CutReview, { nullable: true })
  @UseMiddleware(isAuthenticated)
  async createOrUpdateCutReview(
    @Arg('cutReviewInput') cutReviewInput: CreateOrUpdateCutReviewInput,
    @Ctx() { verifiedUser }: MyContext,
  ): Promise<CutReview | null> {
    if (!verifiedUser) return null
    const { contents, cutId } = cutReviewInput
    // cutId에 대한 기존 감상평 조회
    const prevCutReview = await CutReview.findOne({
      where: { cutId, user: { id: verifiedUser.userId } },
    })

    if (prevCutReview) {
      prevCutReview.contents = contents
      return prevCutReview.save()
    }

    const cutReview = CutReview.create({
      contents: cutReviewInput.contents,
      cutId: cutReviewInput.cutId,
      user: {
        id: verifiedUser.userId,
      },
    })
    return cutReview.save()
  }

  // 필드리졸버 User
  @FieldResolver(() => User)
  async user(@Root() cutReview: CutReview): Promise<User> {
    return (await User.findOneBy({
      id: cutReview.userId,
    }))!
  }
}
