const express = require('express');
const router = express.Router();
const UserController = require("../controllers/userController");
const controller = new UserController();
router.post('/', controller.post);
module.exports = router;