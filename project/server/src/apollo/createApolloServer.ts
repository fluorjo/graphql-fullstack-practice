import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { FilmResolver } from '../resolvers/Film'
import { CutResolver } from '../resolvers/Cut'
import { UserResolver } from '../resolvers/User'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { Request, Response } from 'express'

export interface MyContext{
  req:Request
  res:Response
}

const createApolloServer = async (): Promise<ApolloServer> => {
  return new ApolloServer<MyContext>({
    schema: await buildSchema({
      resolvers: [FilmResolver, CutResolver, UserResolver],
    }),
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
    context:({req,res})=>{
      return {req,res}
    }
  })
}
export default createApolloServer
