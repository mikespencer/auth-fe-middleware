import authMiddleware, {
  INIT_AUTH,
  CONFIGURE,
  TOKEN_RETRIEVED,
  TOKEN_NOT_FOUND,
  REMOVE_TOKEN,
  getAuthUrl,
  getTokenFromUrl
} from './index'

describe('authMiddleware', () => {
  it('should be a function', () => {
    expect(typeof authMiddleware).toEqual('function')
  })
})

describe('exports', () => {
  it('should be defined', () => {
    expect(INIT_AUTH).toBeDefined()
    expect(CONFIGURE).toBeDefined()
    expect(TOKEN_RETRIEVED).toBeDefined()
    expect(TOKEN_NOT_FOUND).toBeDefined()
    expect(REMOVE_TOKEN).toBeDefined()
  })
})

describe('getAuthUrl', () => {
  it('should generate the correct auth url', () => {
    const clientId = 'abc123'
    const redirectUri = 'http://www.meetup.com'
    const authUrl = 'http://www.example.com'
    const actualUrl = getAuthUrl({ clientId, redirectUri, authUrl })
    const expectedUrl = `${authUrl}?response_type=token&client_id=${clientId}&scope=ageless&redirect_uri=${redirectUri}`
    expect(actualUrl).toEqual(expectedUrl)
  })
})

describe('getTokenFromUrl', () => {
  it('should get the token from a given url', () => {
    const token = 'my-token-12345'
    const url = `http://www.example.com#otherParam=true&access_token=${token}&anotherParam=true`
    expect(getTokenFromUrl(url)).toEqual(token)
  })
})
