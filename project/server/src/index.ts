import { ApolloServer } from 'apollo-server-express'
/* eslint-disable no-console */
import 'reflect-metadata'

import express from 'express'
import * as http from 'http'
import { createDB } from './db/db-client'
import 'reflect-metadata'
import createApolloServer from './apollo/createApolloServer'
import cookieParser from 'cookie-parser'

async function main() {
  createDB
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized!')
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err)
    })

  const app = express()
  app.use(cookieParser())

  const apolloServer = await createApolloServer()

  await apolloServer.start()
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
      credentials: true,
    },
  })

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
