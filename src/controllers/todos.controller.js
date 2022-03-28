const express = require("express")
const authenticate = require("../middleware/authenticate")
const app = express.Router()
const todo = require("../models/todos.model")
const authorise = require("../middleware/authorise")

app.post("/",authenticate,async(req,res)=>{
    req.body.userId = req.user._id; 
    try{
      
      const data = await todo.create(req.body)
      return res.status(200).send(data)
   }catch(err){
       console.log(err.message)
       return res.status(400).send(err.message)
   }
})
app.get("/",authenticate,async(req,res)=>{
    let founduser = req.user._id; 
    try{
    const data = await todo.find({userId:founduser}).lean().exec()
    return res.status(200).send(data)
    }catch(err){
        console.log(err.message)
        return res.send(400).send(err.message)
    }
})
app.get("/:id",authenticate,authorise,async(req,res)=>{

    try{
    const data = await todo.find({userId:req.params.id}).lean().exec()
    return res.status(200).send(data)
    }catch(err){
        console.log(err.message)
        return res.send(400).send(err.message)
    }
})
app.patch("/:id",authenticate,authorise,async(req,res)=>{
    try{
    const data = await todo.findByIdAndUpdate({userId:req.params.id},{$set:{"title":req.title}})
    return res.status(200).send(data)
    }catch(err){
        console.log(err.message)
        return res.send(400).send(err.message)
    }
})
app.delete("/:id",authenticate,authorise,async(req,res)=>{
    try{
    const data = await todo.findByIdAndDelete({userId:req.params.id})
    return res.status(200).send(data)
    }catch(err){
        console.log(err.message)
        return res.send(400).send(err.message)
    }
})
module.exports = app;



