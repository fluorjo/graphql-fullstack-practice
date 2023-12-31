import {
  JwtVerifiedUser,
  verifyAccessTokenFromReqHeaders,
} from './../utils/jwt-auth'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { FilmResolver } from '../resolvers/Film'
import { CutResolver } from '../resolvers/Cut'
import { UserResolver } from '../resolvers/User'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { Request, Response } from 'express'
import redis from '../redis/redis-client'
import { createCutVoteLoader } from '../dataloaders/cutVoteLoader'
import { CutReviewResolver } from '../resolvers/CutReview'
import { GraphQLSchema } from 'graphql'

export interface MyContext {
  req: Request
  res: Response
  verifiedUser: JwtVerifiedUser
  redis: typeof redis
  cutVoteLoader: ReturnType<typeof createCutVoteLoader>
}
const createApolloServer = async (
  schema: GraphQLSchema,
): Promise<ApolloServer> => {
  return new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
    context: ({ req, res }) => {
      const verified = verifyAccessTokenFromReqHeaders(req.headers)
      return {
        req,
        res,
        verifiedUser: verified,
        redis,
        cutVoteLoader: createCutVoteLoader(),
      }
    },
  })
}

export default createApolloServer
