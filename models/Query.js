const mongoose=require("mongoose")

const QuerySchema=new mongoose.Schema({

patientName:String,

category:String,

department:String,

priority:String,

description:String,

status:{
type:String,
default:"Pending"
},

progress:{
type:Number,
default:10
},

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}

},{timestamps:true})

module.exports=mongoose.model("Query",QuerySchema)