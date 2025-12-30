import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb", extended: true}));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("mongoDB connected"))
    .catch((err) => console.log("DB error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`);
})