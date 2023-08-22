import { decodeToken } from '../api/auth/auth.utils.js'

export function getHttpContext({ req }) {
  if (req.auth) {
    return { user: req.auth.sub }
  }
  return {}
}

export function getWsContext({ connectionParams }) {
  const accessToken = connectionParams?.accessToken
  if (accessToken) {
    const payload = decodeToken(accessToken)
    return { user: payload.sub }
  }

  return {}
}
