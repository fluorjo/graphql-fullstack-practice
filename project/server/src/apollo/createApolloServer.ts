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


export interface MyContext {
  req: Request
  res: Response
  verifiedUser: JwtVerifiedUser
}

const createApolloServer = async (): Promise<ApolloServer> => {
  return new ApolloServer<MyContext>({
    schema: await buildSchema({
      resolvers: [FilmResolver, CutResolver, UserResolver],
    }),
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
    context: ({ req, res }) => {
      const verified = verifyAccessTokenFromReqHeaders(req.headers)
      return { req, res, verifiedUser: verified }
    },
  })
}


export default createApolloServer
