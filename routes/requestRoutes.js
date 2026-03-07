const router=require("express").Router()

const auth=require("../middleware/authMiddleware")

const ctrl=require("../controllers/requestController")

router.post("/create",auth,ctrl.createRequest)

router.get("/my",auth,ctrl.getMyRequests)

router.get("/role/:role",auth,ctrl.getByRole)

router.put("/forward/:id",auth,ctrl.forwardRequest)

router.put("/next/:id",auth,ctrl.nextStage)

router.put("/schedule/:id",auth,ctrl.schedule)

module.exports=router