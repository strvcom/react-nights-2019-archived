import { api } from './api-client'
import config from '../config'
import { setToken } from '../utils/token'

export const logIn = async (email, password) => {
  const { access_token, owner_id } = await api('/oauth/token', {
    method: 'POST',
    body: JSON.stringify({
      grant_type: 'password',
      username: email,
      password: password,
      client_id: config.clientId,
      client_secret: config.clientSecret,
    }),
  })
  if (access_token) {
    setToken(access_token)
  }
  return owner_id
}
