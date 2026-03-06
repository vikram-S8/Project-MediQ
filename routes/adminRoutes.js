const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { getAdminOverview } = require("../controllers/adminController");

router.get("/overview", auth, getAdminOverview);

module.exports = router;