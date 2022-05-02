const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const controller = new AuthController();
const validators = require('../validators/auth');

router.post('/login', controller.login);
router.post('/me', controller.info);
module.exports = router;