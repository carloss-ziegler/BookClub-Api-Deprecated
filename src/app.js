import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/router.js";

export const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(router);
