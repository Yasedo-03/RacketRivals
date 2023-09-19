const express = require('express');
const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    res.json("Hello");
})

app.listen(4001, () => {
    console.log("Server is Running")
}) 
