const rfr = require('rfr');
const APIError = rfr('boot/api_error');

const handleValidation = async (req, res, next) => {
    const result = await req.getValidationResult()

    if (result.isEmpty()) return next()
    const errors = result.mapped()
    const error = new APIError(errors, 422)
    res.status(error.get().status).json(error.get())
    return next()
}

module.exports = {
    handleValidation
}
