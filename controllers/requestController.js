const Request=require("../models/Request")

// CREATE REQUEST

exports.createRequest=async(req,res)=>{

try{

const {patientName,description,type,priority}=req.body

const request=new Request({

patientName,
description,
type,
priority,

createdBy:req.user.id,

workflow:["Doctor","Admin","Billing","OT"],

stageIndex:0,
currentStage:"Doctor",
status:"Pending"

})

await request.save()

res.json(request)

}catch(err){

res.status(500).json({message:err.message})

}

}


// GET USER REQUESTS

exports.getMyRequests=async(req,res)=>{

try{

const requests=await Request.find({createdBy:req.user.id})

res.json(requests)

}catch(err){

res.status(500).json({message:err.message})

}

}


// ROLE BASED REQUESTS

exports.getByRole=async(req,res)=>{

try{

const role=req.params.role

const requests=await Request.find({
currentStage:role
})

res.json(requests)

}catch(err){

res.status(500).json({message:err.message})

}

}


// FORWARD REQUEST

exports.forwardRequest=async(req,res)=>{

try{

const {destination}=req.body

const request=await Request.findById(req.params.id)

if(!request){
return res.status(404).json({message:"Request not found"})
}

// find stage in workflow
const stageIndex=request.workflow.indexOf(destination)

if(stageIndex===-1){
return res.status(400).json({message:"Invalid destination"})
}

request.stageIndex=stageIndex
request.currentStage=destination
request.status="In Progress"

await request.save()

res.json({message:"Forwarded successfully"})

}catch(err){

res.status(500).json({message:err.message})

}

}


// NEXT STAGE

exports.nextStage=async(req,res)=>{

try{

const request=await Request.findById(req.params.id)

request.stageIndex++

if(request.stageIndex>=request.workflow.length){

request.status="Completed"
request.currentStage="Completed"

}else{

request.currentStage=request.workflow[request.stageIndex]
request.status="In Progress"

}

await request.save()

res.json({message:"Moved to next stage"})

}catch(err){

res.status(500).json({message:err.message})

}

}


// OT SCHEDULING

exports.schedule=async(req,res)=>{

try{

const request=await Request.findById(req.params.id)

request.scheduledTime=req.body.scheduledTime
request.status="Scheduled"

await request.save()

res.json({message:"Operation scheduled"})

}catch(err){

res.status(500).json({message:err.message})

}

}