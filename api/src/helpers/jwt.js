const jwt = require('jsonwebtoken')
const { APP_SECRET } = process.env
const rfr = require('rfr');
const APIError = rfr('boot/api_error');

const getTokenFromRequest = (req) => {
  const authorization = req.header('authorization')
  if (!authorization) { return false }
  return authorization.split(' ')[1] // Bearer
}

const getPayload = (req) => {
  const token = getTokenFromRequest(req)
  return jwt.decode(token)
}

const getUserId = (req) => {
  const data = getPayload(req)
  return data.sub
}

const generateToken = (user, isBackofficeUser = false) => {
  const payload = {
    sub: user.id,
    data: {
      name: user.name
    }
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, APP_SECRET, options)
}

const generateTokenFromObject = (obj, expires) => {
  const options = {
    expiresIn: expires
  }

  return jwt.sign(obj, APP_SECRET, options)
}

const middleware = async (req, res, next) => {
  const token = getTokenFromRequest(req)

  if (!token || !(token.length > 0)) throw new APIError('no_token', 401)

  try {
    await jwt.verify(token, APP_SECRET)
    next()
  } catch (e) {
    if (e.name === 'TokenExpiredError') throw new APIError('token_expired', 403)
    throw new APIError(e.message.split(' ').join('_').toLowerCase(), 401)
  }
}

const verifyToken = (token, req, res) => {
  if (token && token.length > 0) {
    jwt.verify(token, APP_SECRET, (error, decoded) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          return res.status(403).json({ error: error.name, token_is_valid: false })
        } else {
          return res.status(401).json({ error: error.message.split(' ').join('_').toLowerCase(), token_is_valid: false })
        }
      } else {
        return res.status(200).json({ token_is_valid: true })
      }
    })
  } else {
    return false
  }
}

const decode = jwt.decode

const verifyTokenMiddleware = async (req, res, next) => {
  let { token } = req.body
  if (!token || (token.length <= 0)) throw new APIError('no_token', 401)
  token = Buffer
    .from(token, 'base64')
    .toString('ascii')
  try {
    await jwt.verify(token, APP_SECRET)
  } catch (e) {
    if (e.name === 'TokenExpiredError') throw new APIError('token_expired', 403)
    throw new APIError(e.message.split(' ').join('_').toLowerCase(), 401)
  }
  return next()
}

module.exports = {
  getPayload,
  getUserId,
  getTokenFromRequest,
  generateToken,
  middleware,
  generateTokenFromObject,
  decode,
  verifyToken,
  verifyTokenMiddleware
}
