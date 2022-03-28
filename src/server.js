const express = require("express")
const app = express();






app.listen(5000,async()=>{
    try{
        await connect();
    }catch(err){
        console.log(err.message)
    }
    console.log("running")
})