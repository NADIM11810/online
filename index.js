import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import axios from 'axios';
import authRoutes from "./server/routes/auth.routes.js";
import userRoutes from "./server/routes/user.routes.js";
import applyRoutes from "./server/routes/apply.routes.js";
import rechargeRoutes from "./server/routes/recharge.routes.js";
import orderRoutes from "./server/routes/order.routes.js";
import noticeRoutes from "./server/routes/notice.routes.js";
import connectDB from "./server/DB/databaseConfigs.js";
import { uploder } from "./server/middleware/uploder.js";
import { v2 as cloudinary } from "cloudinary";
import dataRoutes from "./server/routes/api.routes.js"
import { uploadSingle } from "./server/middleware/uploadSingle.js";
import balanceRoutes from './server/routes/balance.routes.js';
const app = express();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

dotenv.config();
app.use(cors());
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.post("/uploads", uploder.single("uploads"));
app.use("/api/apply", applyRoutes);
app.use("/api/order", uploder.single("file"), orderRoutes);
app.use("/api/recharge", rechargeRoutes);
app.use("/api/notice", noticeRoutes);
app.use("/api/data", dataRoutes);
app.use('/api/balance', balanceRoutes);
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client" , "dist", "index.html"));
});


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.post("/upload", uploder.single("file"), uploadSingle, async (req, res) => {
  res.send(req.body);
});
app.get("/", (req, res) => {
  res.send("Hello to online API");
});


app.listen(PORT, () => {
  connectDB();
  console.log(`Server Running on port ${PORT}`);
});
