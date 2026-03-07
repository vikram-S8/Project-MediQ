const router=require("express").Router()

const auth=require("../middleware/authMiddleware")

const ctrl=require("../controllers/queryController")

router.post("/create",auth,ctrl.create)

router.get("/my",auth,ctrl.myQueries)

router.get("/department/:dept",auth,ctrl.departmentQueries)

router.put("/forward/:id",auth,ctrl.forward)

router.put("/next/:id",auth,ctrl.next)

module.exports=router