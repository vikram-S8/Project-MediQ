const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/requestController");

// CREATE REQUEST
router.post("/create", auth, ctrl.createRequest);

// PATIENT REQUESTS
router.get("/my", auth, ctrl.getMyRequests);

// DELETE REQUEST
router.delete("/delete/:id", auth, ctrl.deleteRequest);

// ROLE BASED REQUESTS
router.get("/role/:role", auth, ctrl.getByRole);

// SHORTCUT ROUTES
router.get("/OT", auth, (req, res) => {
  req.params.role = "OT";
  ctrl.getByRole(req, res);
});

router.get("/Billing", auth, (req, res) => {
  req.params.role = "Billing";
  ctrl.getByRole(req, res);
});

// WORKFLOW ACTIONS
router.put("/forward/:id", auth, ctrl.forwardRequest);
router.put("/next/:id", auth, ctrl.nextStage);
router.put("/schedule/:id", auth, ctrl.schedule);

module.exports = router;