const BASIC_TOKEN = process.env.BASIC_TOKEN

const getAuthorization = (req) => {
    let res = req.header('authorization')
    if (req.header('x-authorization')) {
        res = req.header('x-authorization')
    }
    return res
}

const getTokenFromRequest = (req) => {
    const authorization = getAuthorization(req)
    if (!authorization) { return false }
    return authorization.split(' ')[1] // Basic
}

const middleware = (req, res, next) => {
    const token = getTokenFromRequest(req)
    if (token && token.length > 0) {
        if (token !== BASIC_TOKEN) {
            res.status(403).json({ error: 'invalid_token' })
            return false
        }
        next()
    } else {
        res.status(401).json({ error: 'no_token' })
        return false
    }
}

module.exports = {
    getTokenFromRequest,
    middleware
}
