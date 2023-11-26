import { ApolloServer } from 'apollo-server-express'
/* eslint-disable no-console */
import 'reflect-metadata'

import express from 'express'
import * as http from 'http'
import { createDB } from './db/db-client'
import 'reflect-metadata'
import createApolloServer from './apollo/createApolloServer'
import cookieParser from 'cookie-parser'
import { graphqlUploadExpress } from 'graphql-upload'
import { createSchema } from './apollo/createSchema'
import { createSubscriptionServer } from './apollo/createSubscriptionServer'
import dotenv from 'dotenv'
dotenv.config()

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
  app.use(express.static('public'))
  app.use(cookieParser())
  app.use(graphqlUploadExpress({ maxFileSize: 1024 * 1000 * 5, maxFiles: 1 }))

  const httpServer = http.createServer(app)

  const schema = await createSchema()
  await createSubscriptionServer(schema, httpServer)
  const apolloServer = await createApolloServer(schema)

  await apolloServer.start()
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
      credentials: true,
    },
  })

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
