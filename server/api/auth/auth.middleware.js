import { expressjwt } from 'express-jwt'
import { JwtSecret } from './auth.config.js'

export const authMiddleware = expressjwt({
  algorithms: ['HS256'],
  credentialsRequired: false,
  secret: JwtSecret,
})
