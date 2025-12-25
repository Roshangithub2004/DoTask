import express from "express"
import Todo from "../models/todo.model.js"

const router = express.Router()

router.get('/', async(req, res)=>{
    try{
        const todos = await Todo.find()
        res.json(todos)
    }
    catch(err){
        res.status(400).send("Something went Wrong " + err.message)
    }
})

router.post('/', async(req, res)=>{
    const text  = req.body.text
    const todo = new Todo({text:text})

    try{
        const newTodo = await todo.save()
        res.status(201).json(newTodo)
    }
    catch(err){
        res.status(400).json("Something went wrong "+ err.message)
    }

})

router.patch('/:id', async(req, res)=>{
    
    try{
        const todo = await Todo.findById(req.params.id)
        if (!todo)return res.status(400).send("Todo not found")

        if (req.body.text !== undefined){
            todo.text = req.body.text
        }

        if (req.body.completed !== undefined){
            todo.completed = req.body.completed
        }
        const updateTodo = await todo.save()
        res.send(updateTodo)

    }
    catch{
        res.status(400).send("Invalid Id")
    }
})

router.delete('/:id', async(req, res)=>{
    try{
        await Todo.findByIdAndDelete(req.params.id)
        res.send("Deleted Successfully")

    }catch(err){
        res.status(400).send(err.message)
    }
})

export default router