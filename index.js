const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cfbd5fy.mongodb.net/?retryWrites=true&w=majority`;
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

    app.get("/", async (req, res) => {
      res.send("server is running");
    });

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

    app.get("/specific", async (req, res) => {
      const serviceLocation = req.query.serviceLocation;
      const size = req.query.size;
      const query = { serviceLocation: serviceLocation, size: size };
      const result = await aparmentsCollection.find(query).toArray();
      res.send(result);
    });
    // for homePage where three service will be shown

    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = aparmentsCollection.find(query);
      const events = await cursor.limit(3).toArray();
      res.send(events);
    });

    app.get("/services", async (req, res) => {
      const query = {};
      const services = await aparmentsCollection.find(query).toArray();
      res.send(services);
    });

    app.get("/services/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await aparmentsCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const services = await aparmentsCollection.findOne(query);
      res.send(services);
      console.log(services);
    });
  } finally {
  }
}

run().catch((error) => console.log(error));

app.listen(port, () => {
  console.log("Simple node server is running");
});
