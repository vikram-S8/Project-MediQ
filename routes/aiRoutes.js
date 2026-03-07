const router=require("express").Router()

const {suggest}=require("../controllers/aiController")

router.post("/suggest",suggest)

module.exports=router