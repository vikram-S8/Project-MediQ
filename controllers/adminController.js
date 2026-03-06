const Request = require("../models/Request");

exports.getAdminOverview = async (req, res) => {
  try {

    // Get only requests currently waiting at Admin stage
    const requests = await Request.find({ currentStage: "Admin" });

    // Return single section for admin
    res.json([
      {
        name: "Admin Queue",
        requests: requests
      }
    ]);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};