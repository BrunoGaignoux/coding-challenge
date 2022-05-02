require('dotenv').config()
require('./boot/db');
const rfr = require('rfr')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = require('./boot/server');
const validator = require('express-validator')
const path = require('path')
const logger = require('morgan')
const timeout = require('express-timeout-handler')
const app = express();

app.use(timeout.handler({
    timeout: 60000,
    onTimeout: function (_req, res) {
        res.status(503).json({ error: 'timeout' })
    }
}))

if (app.get('env') === 'development') {
    app.use(logger('dev'))
    app.get('/template', (req, res) => {
        res.render(`${req.query.path}`, JSON.parse(req.query.data))
    })
}

global._base = path.join(__dirname, '/')

app.use(logger('combined'))
app.use(bodyParser.json({ limit: '42mb' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(validator())
app.use(express.static('public'))

// Set global response headers
app.use((_req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    app.use(cors({
        exposedHeaders: ['Content-Disposition']
    }))
    next()
})
app.options('*', cors())

const userRoute = require('./src/routes/user');
const authRoute = require('./src/routes/auth');
const projectRoute = require('./src/routes/project');
const taskRoute = require('./src/routes/task');
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/projects', projectRoute);
app.use('/api/tasks', taskRoute);

app.get('/', (req, res) => {
    const { version } = require('./package.json')
    res.status(200).json({
        title: "Bolltech API",
        version
    })
})

// Start server
server.start(app)

module.exports = app;
