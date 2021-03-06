const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

console.log(process.env.DB_HOST)

if (process.env.NODE_ENV === 'test') {
    mongoose.connect(process.env.DB_HOST_TEST, options)
} else {
    mongoose.connect(process.env.DB_HOST, options)
}

if (process.env.DEBUG_MONGO_QUERIES === 1) {
    mongoose.set('debug', true)
}

const db = mongoose.connection

if (process.env.NODE_ENV === 'development') {
    db.on('error', (err) => {
        console.log('DB connection error', err)
    })
    db.on('open', () => {
        console.log('DB connection open')
    })
}

db.on('connected', (err) => {
    if (err) console.error(err)
    if (process.env.NODE_ENV === 'development') { console.log('DB connected successfully!') }
})

db.on('disconnected', (err) => {
    if (err) console.error(err)
    if (process.env.NODE_ENV === 'development') { console.log('DB disconnected') }
})

module.exports = db
