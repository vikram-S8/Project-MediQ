const router=require("express").Router()

const auth=require("../middleware/authMiddleware")

const {analytics}=require("../controllers/adminController")

router.get("/analytics",auth,analytics)

module.exports=router