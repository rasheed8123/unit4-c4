const mongoose = require("mongoose")
const todosSchema = new mongoose.Schema({
    title : {type:String, required:true},
    userId : {type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}
},
{
    timestamps:true,
    versionKey:false
})
const todo = mongoose.model("todo",todosSchema)
module.exports = todo