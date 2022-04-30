const mongoose = require('mongoose')
const modelName = 'task'

const structure = {
    name: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: false,
        default: 'todo'
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