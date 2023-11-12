import {
  ApolloClient,
  NormalizedCacheObject,
  from,
  HttpLink,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { createApolloCache } from './createApolloCache'
import { setContext } from '@apollo/client/link/context'

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

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    cache: createApolloCache(),
    uri: 'http://localhost:4000/graphql',
    //이거 순서대로 해야 authorizaion 헤더가 생성됨.
    link: from([authLink, errorLink, httpLink]),
  })
