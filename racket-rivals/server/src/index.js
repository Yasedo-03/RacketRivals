import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/users.js";
import { tournamentRouter } from "./routes/tournaments.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api", userRouter);
app.use("/api/tournament", tournamentRouter);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
