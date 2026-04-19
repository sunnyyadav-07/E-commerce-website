import express from "express";
import morgan from "morgan";
import cors from "cors"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
const app = express();
app.use(morgan("dev"));
app.use(cors({
  credentials:true,
  origin:"http://localhost:5173"
}))
app.use(cookieParser());
app.use(express.json())
app.use("/api/auth", authRouter);
export default app;
