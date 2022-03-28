const express = require("express")
const authenticate = require("../middleware/authenticate")
const app = express.Router()
const todo = require("../models/todos.model")

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
app.get("/:id",authenticate,async(req,res)=>{
    if(req.user._id !== req.params.id){
      return res.send(401).send({message:"logged in user cannot access this info"})
    }
    try{
    const data = await todo.find({userId:req.params.id}).lean().exec()
    return res.status(200).send(data)
    }catch(err){
        console.log(err.message)
        return res.send(400).send(err.message)
    }
})
app.patch("/:id",authenticate,async(req,res)=>{
    if(req.user._id !== req.params.id){
      return res.send(401).send({message:"logged in user cannot access this info"})
    }
    try{
    const data = await todo.findByIdAndUpdate({userId:req.params.id},{$set:{"title":req.title}})
    return res.status(200).send(data)
    }catch(err){
        console.log(err.message)
        return res.send(400).send(err.message)
    }
})
app.delete("/:id",authenticate,async(req,res)=>{
    if(req.user._id !== req.params.id){
      return res.send(401).send({message:"logged in user cannot have this access"})
    }
    try{
    const data = await todo.findByIdAndDelete({userId:req.params.id})
    return res.status(200).send(data)
    }catch(err){
        console.log(err.message)
        return res.send(400).send(err.message)
    }
})
module.exports = app;



