/* eslint-disable no-console */
import 'reflect-metadata'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'
import * as http from 'http'
import { buildSchema } from 'type-graphql'
import { FilmResolver } from './resolvers/Film'
import { CutResolver } from './resolvers/Cut'

async function main() {
  const app = express()

  const apolloServer = new ApolloServer({
    // buildSchema=리졸버를 토대로 graphql 스키마를 자동으로 생성. apollo 서버는 생성된 스키마와 그에 연결된 리졸버를 통해 graphql 서버를 구성.
    schema: await buildSchema({
      resolvers: [FilmResolver, CutResolver],
    }),
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
