const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")

const connectDB=require("./config/db")

dotenv.config()

connectDB()

const app=express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use("/api/auth",require("./routes/authRoutes"))
app.use("/api/query",require("./routes/queryRoutes"))
app.use("/api/admin",require("./routes/adminRoutes"))
app.use("/api/ai",require("./routes/aiRoutes"))
app.use("/api/requests",require("./routes/requestRoutes"))

app.listen(process.env.PORT,()=>{
console.log("Server running on port "+process.env.PORT)
})