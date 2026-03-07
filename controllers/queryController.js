const Query=require("../models/Query")

// ================= CREATE QUERY =================

exports.create=async(req,res)=>{

try{

const {patientName,category,department,priority,description}=req.body

if(!patientName || !category || !department){

return res.status(400).json({msg:"Missing required fields"})

}

const q=await Query.create({

patientName,
category,
department,
priority,
description,
user:req.user.id,
status:"Pending",
progress:10

})

res.json(q)

}catch(err){

console.error(err)

res.status(500).json({msg:"Query creation failed"})

}

}

// ================= USER QUERIES =================

exports.myQueries=async(req,res)=>{

try{

const data=await Query.find({user:req.user.id}).sort({createdAt:-1})

res.json(data)

}catch(err){

res.status(500).json({msg:"Failed to fetch queries"})

}

}

// ================= DEPARTMENT QUERIES =================

exports.departmentQueries=async(req,res)=>{

try{

const dept=req.params.dept

const data=await Query.find({

department:dept,
status:{$ne:"Resolved"}

}).sort({createdAt:-1})

res.json(data)

}catch(err){

console.error(err)

res.status(500).json({msg:"Department fetch failed"})

}

}

// ================= FORWARD =================

exports.forward=async(req,res)=>{

try{

await Query.findByIdAndUpdate(req.params.id,{

status:"In Progress",
progress:70

})

res.json({msg:"Forwarded successfully"})

}catch(err){

res.status(500).json({msg:"Forward failed"})

}

}

// ================= COMPLETE =================

exports.next=async(req,res)=>{

try{

await Query.findByIdAndUpdate(req.params.id,{

status:"Resolved",
progress:100

})

res.json({msg:"Completed"})

}catch(err){

res.status(500).json({msg:"Completion failed"})

}

}