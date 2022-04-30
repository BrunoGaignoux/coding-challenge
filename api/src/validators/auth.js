const { body } = require('express-validator/check');
const rfr = require('rfr');
const handleValidation = rfr('src/helpers/validation').handleValidation;
const { testPattern } = rfr('src/helpers/patterns');

const emailValidators = (required) => {
    if (required) {
        return body('email')
            .exists().withMessage('required')
            .custom((val) => {
                return testPattern.email(val)
            }).withMessage('invalid_email')
    }
}

const passwordValidators = (required) => {
    if (required) {
        return body('password')
            .exists().withMessage('required')
            .custom((val) => {
                return testPattern.password(val)
            }).withMessage('invalid_password')
            .isLength({ min: 8, max: 10 }).withMessage('invalid_length')
    }

    return body('password')
        .isLength({ min: 8, max: 10 }).withMessage('invalid_length').optional({ checkFalsy: true })
}

const authValidator = (required) => {
    return [
        emailValidators(required),
        passwordValidators(required),
        handleValidation
    ]
}

module.exports = {
    create: [
        ...authValidator(true)
    ]
}
