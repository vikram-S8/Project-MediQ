const Query=require("../models/Query")

exports.analytics=async(req,res)=>{

try{

const total=await Query.countDocuments()

const pending=await Query.countDocuments({status:"Pending"})

const resolved=await Query.countDocuments({status:"Resolved"})

const emergency=await Query.countDocuments({priority:"Emergency"})

const cardiology=await Query.countDocuments({department:"Cardiology"})
const neurology=await Query.countDocuments({department:"Neurology"})
const radiology=await Query.countDocuments({department:"Radiology"})
const general=await Query.countDocuments({department:"General Medicine"})

res.json({

total,
pending,
resolved,
emergency,

cardiology,
neurology,
radiology,
general

})

}catch(err){

console.error(err)

res.status(500).json({msg:"Analytics error"})

}

}