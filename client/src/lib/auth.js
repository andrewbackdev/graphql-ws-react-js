import jwtDecode from 'jwt-decode'
import { ServerApiUrl } from '../config/server'

const ACCESS_TOKEN_KEY = 'accessToken'

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getUser() {
  const token = getAccessToken()
  if (!token) {
    return null
  }
  return getUserFromToken(token)
}

export async function login(username, password) {
  const response = await fetch(`${ServerApiUrl}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  if (response.ok) {
    const { token } = await response.json()
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
    return username
  }
  return null
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

function getUserFromToken(token) {
  const jwtPayload = jwtDecode(token)
  return jwtPayload.sub
}
