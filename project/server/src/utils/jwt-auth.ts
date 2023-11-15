// project/server/src/utils/jwt-auth.ts

import User from '../entities/User'
import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-core'
import { IncomingHttpHeaders } from 'http'
import { Response } from 'express'

export const DEFAULT_JWT_SECRET_KEY = 'secret-key'
export const REFRESH_JWT_SECRET_KEY = 'secret-key2'

export interface JwtVerifiedUser {
  userId: User['id']
}

/**엑세스 토큰 발급 */
export const createAccessToken = (user: User): string => {
  const userData: JwtVerifiedUser = { userId: user.id }
  const accessToken = jwt.sign(
    userData,
    process.env.JWT_SECRET_KEY || DEFAULT_JWT_SECRET_KEY,
    { expiresIn: '300s' },
  )
  return accessToken
}

/**리프레시 토큰 발급 */
export const createRefreshToken = (user: User): string => {
  const userData: JwtVerifiedUser = { userId: user.id }
  return jwt.sign(
    userData,
    process.env.JWT_REFRESH_SECRET_KEY || REFRESH_JWT_SECRET_KEY,
    {
      expiresIn: '14d',
    },
  )
}

/**엑세스 토큰 검증 */
export const verifyAccessToken = (
  accessToken?: string,
): JwtVerifiedUser | null => {
  if (!accessToken) return null
  try {
    const verified = jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY || DEFAULT_JWT_SECRET_KEY,
    ) as JwtVerifiedUser
    return verified
  } catch (err) {
    console.error('access_token_expired', err.expiredAt)
    throw new AuthenticationError('access_token_expired')
  }
}

/** req, headers 로부터 엑세스 토큰 검증 */
export const verifyAccessTokenFromReqHeaders = (
  headers: IncomingHttpHeaders,
): JwtVerifiedUser | null => {
  const { authorization } = headers
  if (!authorization) return null

  const accessToken = authorization.split(' ')[1]
  try {
    return verifyAccessToken(accessToken)
  } catch {
    return null
  }
}

export const setRefreshTokenHeader = (
  res: Response,
  refreshToken: string,
  ): void => {
    res.cookie('refreshtoken', refreshToken, {
      //js 코드로 접근 불가능하게 설정
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })

}
