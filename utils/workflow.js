const getWorkflow = (type, priority) => {
  if (type === "Surgery") {
    return priority === "Emergency"
      ? ["Doctor", "OT", "Billing"]
      : ["Doctor", "Admin", "Billing", "OT"];
  }
  return ["Reception", "Doctor"];
};

module.exports = getWorkflow;