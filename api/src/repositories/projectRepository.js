const rfr = require('rfr');
const mongoose = require('mongoose')
const modelName = 'project'
const tasks = rfr('src/repositories/taskRepository').schema

const structure = {
    name: {
        type: String,
        required: true,
        unique: true
    },
    tasks: [tasks]
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