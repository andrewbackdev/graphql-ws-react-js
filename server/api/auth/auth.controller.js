import { getUser } from '../../db/users.js'
import { signJwt } from './auth.utils.js'

export async function handleLogin(req, res) {
  const { username, password } = req.body
  const user = await getUser(username)

  if (!user || user.password !== password) {
    res.sendStatus(401)
    return
  }

  const claims = { sub: username }
  const token = signJwt(claims)
  res.json({ token })
}
