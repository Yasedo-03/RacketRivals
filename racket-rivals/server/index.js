import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express()
const port = 3001

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})