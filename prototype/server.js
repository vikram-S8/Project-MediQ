const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 IN-MEMORY DATABASE
let requests = [];

// WORKFLOW LOGIC
const getWorkflow = (type) => {
  if (type === "Surgery") {
    return ["Doctor", "Admin", "Billing", "OT"];
  }
  return ["Reception", "Doctor"];
};

// CREATE REQUEST
app.post("/create", (req, res) => {
  const { patientName, type } = req.body;

  const workflow = getWorkflow(type);

  const newRequest = {
    id: Date.now().toString(),
    patientName,
    type,
    workflow,
    stageIndex: 0,
    currentDepartment: workflow[0],
    status: "In Progress"
  };

  requests.push(newRequest);
  res.json(newRequest);
});

// GET BY ROLE
app.get("/requests/:role", (req, res) => {
  const role = req.params.role;

  const data = requests.filter(
    r => r.currentDepartment === role && r.status !== "Completed"
  );

  res.json(data);
});

// MOVE NEXT
app.put("/next/:id", (req, res) => {
  const request = requests.find(r => r.id === req.params.id);

  if (!request) return res.send("Not found");

  if (request.stageIndex < request.workflow.length - 1) {
    request.stageIndex++;
    request.currentDepartment = request.workflow[request.stageIndex];
  } else {
    request.status = "Completed";
  }

  res.json(request);
});

app.get("/", (req, res) => {
  res.send("Prototype Running");
});

app.listen(5000, () => console.log("🚀 Prototype running on 5000"));