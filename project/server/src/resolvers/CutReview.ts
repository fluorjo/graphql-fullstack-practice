import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import { CutReview } from '../entities/CutReview'
import { IsInt, IsString } from 'class-validator'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import { MyContext } from '../apollo/createApolloServer'

@InputType()
class CreateOrUpdateCutReviewInput {
  @Field(() => Int, { description: 'cut number' })
  @IsInt()
  cutId: number

  @Field({ description: 'review content' })
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
}
