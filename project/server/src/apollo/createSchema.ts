import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'
import { CutResolver } from '../resolvers/Cut'
import { CutReviewResolver } from '../resolvers/CutReview'
import { FilmResolver } from '../resolvers/Film'
import { UserResolver } from '../resolvers/User'
import { PubSub } from 'graphql-subscriptions'
import { NotificationResolver } from '../resolvers/Notification'

export const createSchema = async (): Promise<GraphQLSchema> => {
  return buildSchema({
    resolvers: [
      FilmResolver,
      CutResolver,
      UserResolver,
      CutReviewResolver,
      NotificationResolver,
    ],
    validate: false,
    pubSub: new PubSub(),
    // Disable built-in validation to use custom validation
  })
}
