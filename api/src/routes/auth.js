const rfr = require('rfr');
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const controller = new AuthController();
const validators = require('../validators/auth');
const basicMiddleware = rfr('src/helpers/basic_auth').middleware

router.post('/login', [basicMiddleware, validators.create], controller.login);
router.post('/me', controller.info);
module.exports = router;