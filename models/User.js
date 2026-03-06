const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["Patient", "Doctor", "Admin", "Billing", "OT"]
  }
});

module.exports = mongoose.model("User", userSchema);