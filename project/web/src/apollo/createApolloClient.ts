import {
  ApolloClient,
  NormalizedCacheObject,
  from,
  HttpLink,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { createApolloCache } from './createApolloCache'

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQl error]: -> ${operation.operationName}
    Message: ${message},Query:${path}, Location: ${JSON.stringify(locations)}`,
      ),
    )
  }

  if (networkError) {
    console.log(
      `[GraphQl error]: -> ${operation.operationName}
    Message: ${networkError.message}`,
    )
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    cache: createApolloCache(),
    link: from([errorLink, httpLink]),
  })
