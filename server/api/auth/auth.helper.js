import { unauthorizedError } from '../../app/exceptions.js'

export function requireAuth(user) {
  if (user) {
    return
  }

  throw unauthorizedError()
}
