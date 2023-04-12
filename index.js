const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xloqa3g.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

app.get("/", (req, res) => {
  res.send("Simple node server is ruunning");
});

app.listen(port, () => {
  console.log("Simple node server is running");
});
