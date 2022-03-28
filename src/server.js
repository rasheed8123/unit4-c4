const express = require("express")
const app = express();
const connect = require("./configs/db")
const {register,login,generateToken} = require("./controllers/auth.controller")
const todos = require("./controllers/todos.controller")
app.use(express.json());
app.post("/register", register)

app.post("/login", login)

app.use("/todos",todos)

app.listen(5000,async()=>{
    try{
        await connect();
    }catch(err){
        console.log(err.message)
    }
    console.log("running")
})