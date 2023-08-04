import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.routes.js";
import postRouter from "./src/routes/posts.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/public", express.static('./src/public/uploads'));
app.use("/api", authRouter);
app.use("/api", postRouter);


export default app;
