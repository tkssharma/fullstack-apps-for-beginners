const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    id: String,
    title: String
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo