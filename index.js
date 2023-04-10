const express = require("express");
const app = express();
const port = process.env.port || 5000;

app.get("/", (req, res) => {
  res.send("Simple node server is ruunning");
});

app.listen(port, () => {
  console.log("Simple node server is running");
});
