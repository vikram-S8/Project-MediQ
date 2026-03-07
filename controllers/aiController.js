exports.suggest=(req,res)=>{

const text=req.body.text.toLowerCase()

let suggestion="General consultation recommended."

if(text.includes("chest")||text.includes("heart")){
suggestion="Possible cardiac issue. Recommend ECG."
}

else if(text.includes("headache")){
suggestion="Possible neurological issue."
}

else if(text.includes("fever")){
suggestion="Check infection markers."
}

res.json({suggestion})

}