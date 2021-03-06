const rfr = require('rfr');
const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const controller = new TaskController();
const middleware = rfr('src/helpers/jwt').middleware
router.get('/:id', middleware, controller.one);
router.get('/', middleware, controller.get);
router.post('/', middleware, controller.post);
router.put('/:id', middleware, controller.put);
router.delete('/:id', middleware, controller.delete);
module.exports = router;