const mongoose = require('mongoose')
const modelName = 'task'

const structure = {
    name: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: false,
    },
    from: {
        type: String,
        required: false,
    },
    done: {
        type: Boolean,
        required: false,
        default: false
    }
}

const options = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
}

const schema = mongoose.Schema(structure, options)
schema.plugin(require('mongoose-bcrypt'), {rounds: 10})

const model = mongoose.model(modelName, schema)

module.exports = {
    schema,
    model
}