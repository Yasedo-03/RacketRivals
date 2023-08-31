import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express()
const port = 3001

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})