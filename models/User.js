const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({

name:String,

email:{
type:String,
unique:true
},

password:String,

role:{
type:String,
enum:["Patient","Doctor","Admin","Billing","OT"],
default:"Patient"
}

},{timestamps:true})

module.exports=mongoose.model("User",UserSchema)