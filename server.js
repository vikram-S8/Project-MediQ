const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.listen(5000, () => console.log("🚀 Server running"));