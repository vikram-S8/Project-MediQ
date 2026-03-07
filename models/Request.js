const mongoose=require("mongoose")

const requestSchema=new mongoose.Schema({

patientName:String,

description:String,

type:String,

priority:String,

status:{
type:String,
default:"Pending"
},

workflow:{
type:[String],
default:["Doctor","Admin","Billing","OT"]
},

stageIndex:{
type:Number,
default:0
},

currentStage:{
type:String,
default:"Doctor"
},

createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

scheduledTime:String

},{timestamps:true})

module.exports=mongoose.model("Request",requestSchema)