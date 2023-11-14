import {
  ApolloClient,
  NormalizedCacheObject,
  from,
  HttpLink,
  fromPromise,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { createApolloCache } from './createApolloCache'
import { setContext } from '@apollo/client/link/context'
import { refreshAccessToken } from './auth'

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

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
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

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  apolloClient = new ApolloClient({
    cache: createApolloCache(),
    uri: 'http://localhost:4000/graphql',
    //이거 순서대로 해야 authorizaion 헤더가 생성됨.
    link: from([authLink, errorLink, httpLink]),
  })
  return apolloClient
}
