import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { FilmResolver } from '../resolvers/Film'
import { CutResolver } from '../resolvers/Cut'
import { UserResolver } from '../resolvers/User'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'

const createApolloServer = async (): Promise<ApolloServer> => {
  return new ApolloServer({
    schema: await buildSchema({
      resolvers: [FilmResolver, CutResolver, UserResolver],
    }),
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  })
}
export default createApolloServer
