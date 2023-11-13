import { MiddlewareFn } from 'type-graphql/dist/interfaces/Middleware'
import { MyContext } from '../apollo/createApolloServer'
import { AuthenticationError } from 'apollo-server-core'
import { verifyAccessToken } from '../utils/jwt-auth'

// project/server/src/middlewares/isAuthenticated.ts
export const isAuthenticated: MiddlewareFn<MyContext> = async (
  { context },
  next,
) => {
  const { authorization } = context.req.headers
  if (!authorization) throw new AuthenticationError('unauthenticated')

  const accessToken = authorization.split(' ')[1]
  verifyAccessToken(accessToken)

  if (!context.verifiedUser) throw new AuthenticationError('unauthenticated')
  return next()
}
