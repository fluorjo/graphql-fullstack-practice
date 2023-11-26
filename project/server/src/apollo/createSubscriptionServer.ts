import { GraphQLSchema, execute, subscribe } from 'graphql'
import http from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { JwtVerifiedUser, verifyAccessToken } from '../utils/jwt-auth'

export interface MySubscriptionContext {
  verifiedUser: JwtVerifiedUser | null
}

export const createSubscriptionServer = async (
  schema: GraphQLSchema,
  server: http.Server,
): Promise<SubscriptionServer> => {
  return SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: (connectionParams: any): MySubscriptionContext => {
        const accessToken = connectionParams.Authorization.split(' ')[1]
        return { verifiedUser: verifyAccessToken(accessToken) }
      },
      onDisconnect: () => {
        console.log('disconnected')
      },
    },
    { server, path: '/graphql' },
  )
}
