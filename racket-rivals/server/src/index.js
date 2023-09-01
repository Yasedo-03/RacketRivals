import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userRouter } from "./routes/users.js";

dotenv.config();

const app = express()
const port = 3001

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

mongoose.connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})