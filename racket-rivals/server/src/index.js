import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/users.js";
import { tournamentRouter } from "./routes/tournaments.js";
import { matchRouter } from "./routes/matchs.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

let clientURL;

if (process.env.NODE_ENV === "production") {
  clientURL = process.env.CLIENT_URL_PROD;
} else {
  clientURL = process.env.CLIENT_URL_DEV;
}

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: clientURL,
  credentials: true,
  exposedHeaders: ["Content-Range"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/tournament", tournamentRouter);
app.use("/api/match", matchRouter);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export default app;
