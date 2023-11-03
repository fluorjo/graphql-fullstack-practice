import 'reflect-metadata'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'
import * as http from 'http'

async function main() {
  const app = express()

  const apolloServer = new ApolloServer({
    typeDefs: gql`
      type Query {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => 'hello~~~',
      },
    },
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })
  const httpServer = http.createServer(app)

  httpServer.listen(process.env.PORT || 4000, () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`
    server start on =>http://localhost:4000
    graphql playground =>http://localhost:4000/graphql
    `)
    } else {
      console.log(`
        production server started...`)
    }
  })
}

main().catch((err) => console.error(err))
