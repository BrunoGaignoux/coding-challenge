require('express-async-errors')

class APIError extends Error {
    constructor (message = 'Unhandled error', status = 500) {
        super(message)
        this.name = 'APIError'
        this.status = status
        this.message = message
    }

    get() {
        return {
            name: this.name,
            status: this.status,
            message: this.message
        }
    }
}

module.exports = APIError
