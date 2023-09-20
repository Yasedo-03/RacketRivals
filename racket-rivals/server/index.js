import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { authRouter } from "./src/routes/auth.js";
import { userRouter } from "./src/routes/users.js";
import { tournamentRouter } from "./src/routes/tournaments.js";
import { matchRouter } from "./src/routes/matchs.js";

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
const port = process.env.PORT || 5001;
const corsOptions = {
  origin: 'https://racket-rivals.vercel.app/',
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/", (req, res) => {
  res.send("Server is running");
})

app.use("/api/auth", authRouter);
app.use("/api", userRouter);
app.use("/api/tournament", tournamentRouter);
app.use("/api/match", matchRouter);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
