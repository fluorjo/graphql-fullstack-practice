import {
  ApolloClient,
  NormalizedCacheObject,
  from,
  HttpLink,
  fromPromise,
  split,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { createApolloCache } from './createApolloCache'
import { setContext } from '@apollo/client/link/context'
import { refreshAccessToken } from './auth'

import { createUploadLink } from 'apollo-upload-client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

let apolloClient: ApolloClient<NormalizedCacheObject>

const errorLink = onError(
  // eslint-disable-next-line consistent-return
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      if (graphQLErrors.find((err) => err.message === 'access_token_expired')) {
        return fromPromise(refreshAccessToken(apolloClient, operation))
          .filter((result) => !!result)
          .flatMap(() => forward(operation))
      }
      console.log('apollo', apolloClient)
      graphQLErrors.forEach(({ message, locations, path }) =>
        // eslint-disable-next-line no-console
        console.log(
          `[GraphQl error]: -> ${operation.operationName}
          Message: ${message},Query:${path}, Location: ${JSON.stringify(
            locations,
          )}`,
        ),
      )
    }

    if (networkError) {
      // eslint-disable-next-line no-console
      console.log(
        `[networkError]: -> ${operation.operationName}
    Message: ${networkError.message}`,
      )
    }
  },
)

const httpUploadLink = new (createUploadLink as any)({
  //uri: 'http://localhost:4000/graphql',
  uri: `${process.env.REACT_APP_API_HOST}/graphql`,
  credentials: 'include',
})

const authLink = setContext((request, prevContext) => {
  const accessToken = localStorage.getItem('access_token')
  return {
    headers: {
      ...prevContext.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  }
})
const wsLink = new WebSocketLink({
  // uri: 'ws://localhost:4000/graphql',
  uri: `${process.env.REACT_APP_API_SUBSCRIPTION_HOST}/graphql`,
  options: {
    reconnect: true,
    connectionParams: () => {
      const accessToken = localStorage.getItem('access_token')
      return {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      }
    },
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  from([wsLink]),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from([authLink, errorLink, httpUploadLink as any]),
)
export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  apolloClient = new ApolloClient({
    cache: createApolloCache(),
    // uri: 'http://localhost:4000/graphql',
    uri: `${process.env.REACT_APP_API_HOST}/graphql`,
    //이거 순서대로 해야 authorizaion 헤더가 생성됨.
    link: splitLink,
  })
  return apolloClient
}
