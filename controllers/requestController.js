const Request = require("../models/Request");

// ================= PROGRESS =================

const calculateProgress = (request) => {

  const totalStages = request.workflow.length;

  if (request.status === "Completed") return 100;

  return Math.floor((request.stageIndex / totalStages) * 100);
};


// ================= CREATE =================

exports.createRequest = async (req, res) => {

  try {

    const { patientName, description, type, priority } = req.body;

    const request = new Request({
      patientName,
      description,
      type,
      priority,

      createdBy: req.user.id,

      workflow: ["Doctor", "Admin", "Billing", "OT"],
      stageIndex: 0,
      currentStage: "Doctor",
      status: "Pending"
    });

    await request.save();

    res.json({ message: "Request created" });

  } catch (err) {

    res.status(500).json({ message: err.message });

  }
};


// ================= GET MY REQUESTS =================

exports.getMyRequests = async (req, res) => {

  try {

    const requests = await Request.find({ createdBy: req.user.id });

    const formatted = requests.map(r => ({
      _id: r._id,
      patientName: r.patientName,
      description: r.description,
      type: r.type,
      status: r.status,
      currentStage: r.currentStage,
      workflow: r.workflow,
      stageIndex: r.stageIndex,
      progress: calculateProgress(r)
    }));

    res.json(formatted);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }
};


// ================= DELETE =================

exports.deleteRequest = async (req, res) => {

  try {

    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await request.deleteOne();

    res.json({ message: "Request deleted successfully" });

  } catch (err) {

    res.status(500).json({ message: err.message });

  }
};


// ================= ROLE BASED =================

exports.getByRole = async (req, res) => {

  try {

    const role = req.params.role;

    const requests = await Request.find({
      currentStage: role
    });

    res.json(requests);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }
};


// ================= FORWARD =================

exports.forwardRequest = async (req, res) => {

  try {

    const { destination } = req.body;

    const request = await Request.findById(req.params.id);

    request.currentStage = destination;
    request.status = "In Progress";

    await request.save();

    res.json({ message: "Forwarded successfully" });

  } catch (err) {

    res.status(500).json({ message: err.message });

  }
};


// ================= NEXT STAGE =================

exports.nextStage = async (req, res) => {

  try {

    const request = await Request.findById(req.params.id);

    request.stageIndex++;

    if (request.stageIndex >= request.workflow.length) {

      request.status = "Completed";
      request.currentStage = "Completed";

    } else {

      request.currentStage = request.workflow[request.stageIndex];
      request.status = "In Progress";

    }

    await request.save();

    res.json({ message: "Moved to next stage" });

  } catch (err) {

    res.status(500).json({ message: err.message });

  }
};


// ================= SCHEDULE =================

exports.schedule = async (req, res) => {

  try {

    const request = await Request.findById(req.params.id);

    request.scheduledTime = req.body.scheduledTime;
    request.status = "Scheduled";

    await request.save();

    res.json({ message: "Operation scheduled" });

  } catch (err) {

    res.status(500).json({ message: err.message });

  }
};