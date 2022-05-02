const rfr = require('rfr');
const mongoose = require('mongoose')
const modelName = 'user'
const projects = rfr('src/repositories/projectRepository').schema

const structure = {
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        bcrypt: true,
        select: false
    },
    projects: [projects]
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