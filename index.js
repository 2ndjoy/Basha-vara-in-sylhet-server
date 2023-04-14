const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xloqa3g.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const aparmentsCollection = client
      .db("aparments")
      .collection("aparmentsCollection");

    app.get("/services", async (req, res) => {
      const query = {};
      const services = await aparmentsCollection.find(query).toArray();
      res.send(services);
    });

    app.post("/services", async (req, res) => {
      const services = req.body;
      const result = await aparmentsCollection.insertOne(services);
      res.send(result);
    });

    app.get("/", async (req, res) => {
      res.send("server is running");
    });

    app.get("/specific", async (req, res) => {
      const serviceLocation = req.query.serviceLocation;
      const size = req.query.size;
      const query = { serviceLocation: serviceLocation, size: size };
      const result = await aparmentsCollection.find(query).toArray();
      res.send(result);
    });
  } finally {
  }
}

run().catch((error) => console.log(error));

app.listen(port, () => {
  console.log("Simple node server is running");
});
