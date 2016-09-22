import Cookies from 'js-cookie'

// ACTION TYPES
export const INIT_AUTH = 'MEETUP_OATH_FE_MIDDLEWARE__INIT_AUTH'
export const CONFIGURE = 'MEETUP_OATH_FE_MIDDLEWARE__CONFIGURE'
export const TOKEN_RETRIEVED = 'MEETUP_OATH_FE_MIDDLEWARE__TOKEN_RETRIEVED'
export const TOKEN_NOT_FOUND = 'MEETUP_OATH_FE_MIDDLEWARE__TOKEN_NOT_FOUND'
export const REMOVE_TOKEN = 'MEETUP_OATH_FE_MIDDLEWARE__REMOVE_TOKEN'

// MISC CONSTANTS
export const OATH_TOKEN_STORAGE_KEY = 'proAdminOauthToken'

// UTILS
export const initAuth = ({ clientId, redirectUri, authUrl }) => {
  const url = getAuthUrl({
    clientId,
    redirectUri,
    authUrl
  })
  window.open(url, 'Meetup Oauth', 'height=500,width=500')
}

export const getAuthUrl = ({ clientId, redirectUri, authUrl }) => {
  const authParams = [
    'response_type=token',
    `client_id=${clientId}`,
    'scope=ageless',
    `redirect_uri=${redirectUri}`
  ].join('&')
  return `${authUrl}?${authParams}`
}

export const getToken = () => (
  Cookies.get(OATH_TOKEN_STORAGE_KEY)
)
export const setToken = val => {
  Cookies.set(
    OATH_TOKEN_STORAGE_KEY,
    val,
    { expires: 5 * 365 }
  )
}
export const removeToken = () => {
  Cookies.remove(OATH_TOKEN_STORAGE_KEY)
}

export const getParamFromUrl = (param, url = window.location.hash) => {
  const regexp = new RegExp(`${param}=([^&]*)`)
  const paramValue = regexp.exec(url)
  return paramValue && paramValue[1]
}

// THE MIDDLEWARE
const middleware = ({ clientId, redirectUri, authUrl }) => store => next => action => {
  switch (action.type) {
    case INIT_AUTH:
      initAuth({ clientId, redirectUri, authUrl })
      break
    case CONFIGURE:
      const tokenFromUrl = getParamFromUrl('access_token')
      const errorFromUrl = getParamFromUrl('error')
      if (tokenFromUrl) {
        setToken(tokenFromUrl)
        window.opener && window.opener.location.reload()
        window.close()
      } else if (errorFromUrl) {
        window.close()
      }
      const token = getToken()
      if (token) {
        next({
          type: TOKEN_RETRIEVED,
          payload: {
            token: getToken()
          }
        })
      } else {
        next({
          type: TOKEN_NOT_FOUND
        })
      }
      return
    case REMOVE_TOKEN:
      removeToken()
      break
    default:
      // nothing yet...
  }
  next(action)
}

export default middleware
