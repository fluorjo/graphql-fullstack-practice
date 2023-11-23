import { GraphQLSchema, execute, subscribe } from 'graphql'
import http from 'http'
import {SubscriptionServer} from 'subscriptions-transport-ws'

export const createSubscriptionServer = async (
  schema: GraphQLSchema,
  server: http.Server,
): Promise<SubscriptionServer> => {
  return SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect:(connectionParams:any)=>{
        console.log('connected')
      },
    },
    {server,path:'/graphql'}
  )
}
