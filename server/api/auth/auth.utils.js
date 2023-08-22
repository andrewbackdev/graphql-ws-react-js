import jwt from 'jsonwebtoken'
import { JwtSecret } from './auth.config.js'

export function decodeToken(token) {
  return jwt.verify(token, JwtSecret)
}

export function signJwt(payload) {
  return jwt.sign(payload, JwtSecret)
}
