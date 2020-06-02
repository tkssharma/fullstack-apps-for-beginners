const express = require('express')
const router = express.Router()
const uuid = require('uuid')
const Todo = require('../model/todo');

router.post('/todos', async (req, res, next) => {
    const newTodo = new Todo({
        id: uuid.v4(),
        title: req.body.title
    });
    try {
        const todo = await newTodo.save();
        res.json(todo);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.get('/todos', async (req, res, next) => {
    try {
        const todos = await Todo.find({});
        res.json(todos);
    }
    catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/todo/:id', async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if(todo){
            await Todo.remove(todo);
            res.json({
                message: 'item removed successfully'
            })
        } else {
            res.json({message: 'todo item not found'});
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

});

router.put('/todo/:id', async (req, res, next) => {

    try {
        const todo = await Todo.findById(req.params.id);
        if(todo){
            todo.title= req.body.title;
            await todo.save();
        }
        res.json(todo);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

module.exports = router;