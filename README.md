[![Build Status](https://travis-ci.org/mikespencer/auth-fe-middleware.svg?branch=master)](https://travis-ci.org/mikespencer/auth-fe-middleware)
[![Coverage Status](https://coveralls.io/repos/github/mikespencer/auth-fe-middleware/badge.svg?branch=master)](https://coveralls.io/github/mikespencer/auth-fe-middleware?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![Code Climate](https://codeclimate.com/github/mikespencer/auth-fe-middleware/badges/gpa.svg)](https://codeclimate.com/github/mikespencer/auth-fe-middleware)

# meetup-auth-fe-middleware

Redux middleware for Oauth2 connection on the client side. Tokens are stored in `localStorage`.

## Installation

`npm install --save meetup-auth-fe-middleware`

## Usage

```js
import { applyMiddleware } from 'redux'
import authMiddleware from 'meetup-auth-fe-middleware'

applyMiddleware(
    authMiddleware({
      clientId: 'your-client-id', // required
      redirectUri: 'your-redirect-uri', //required
      authUrl: 'https://secure.dev.meetup.com/oauth2/authorize/' // required
    })
  )
```

### Connecting

1. dispatch this action:

```js
import { INIT_AUTH } from 'meetup-auth-fe-middleware'

{
  type: INIT_AUTH
}
```


### Getting the token

1. dispatch this action:

```js
import { CONFIGURE } from 'meetup-auth-fe-middleware'

{
  type: CONFIGURE
}
```

2. This will call the next reducer with either:

```js
{
  type: TOKEN_RETRIEVED,
  payload: {
    token // the retrieved token
  }
}
```

or:

```js
{
  type: TOKEN_NOT_FOUND
}
```

3. in your reducer:

```js
import { TOKEN_RETRIEVED } from 'meetup-auth-fe-middleware'

// ...
case TOKEN_RETRIEVED:
  return { token: action.payload.token } // state === { token }
// ...
```

### Disconnect

1. Dispatch this action:

```js
import { REMOVE_TOKEN } from 'meetup-auth-fe-middleware'

{
  type: REMOVE_TOKEN
}
```

2. in your reducer:

```js
import { REMOVE_TOKEN } from 'meetup-auth-fe-middleware'

// ...
case REMOVE_TOKEN:
  return { token: null } // state === { token: null }
// ...
```

## Updating this package

1. Make your changes
2. `npm version major|minor|patch`. This will:
  1. Run unit tests
  2. Run eslint
  3. Update the version number in `package.json`
  4. Commit the update and also create a corresponding git tags
  5. Push the update and tag to GitHub
3. `npm publish` to push the update to NPM
