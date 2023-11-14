import { ApolloClient, NormalizedCacheObject, Operation } from '@apollo/client'
import {
  RefreshAccessTokenDocument,
  RefreshAccessTokenMutation,
} from '../generated/graphql'

export const refreshAccessToken = (
  _apolloClient: ApolloClient<NormalizedCacheObject>,
  operation: Operation,
): Promise<boolean> => {
  console.log(_apolloClient)

  return  _apolloClient
    .mutate<RefreshAccessTokenMutation>({
      mutation: RefreshAccessTokenDocument,
    })
    .then(({ data }) => {
      const newAccessToken = data?.refreshAccessToken?.accessToken
      if (!newAccessToken) {
        localStorage.setItem('access_token', '')
        return false
      }

      localStorage.setItem('access_token', newAccessToken)
      const prevContext = operation.getContext()
      operation.setContext({
        headers: {
          ...prevContext.headers,
          authorization: `Bearer ${newAccessToken}`,
        },
      })
      return true
    })
    .catch(() => {
      localStorage.setItem('access_token', '')
      return false
    })
}
