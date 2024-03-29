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

    const myorderCollection = client
      .db("aparments")
      .collection("myorderCollection");

    const userCollections = client
      .db("aparments")
      .collection("userCollections");

    const reviewCollection = client
      .db("aparments")
      .collection("reviewCollection");

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

    app.delete("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await aparmentsCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/myorders", async (req, res) => {
      const services = req.body;
      const result = await myorderCollection.insertOne(services);
      res.send(result);
    });

    app.get("/myorders/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await myorderCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/myorders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await myorderCollection.deleteOne(query);
      res.send(result);
    });

    // delete user
    app.delete("/userss/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollections.deleteOne(query);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollections.insertOne(user);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const query = {};
      const services = await userCollections.find(query).toArray();
      res.send(services);
    });

    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await userCollections.find(query).toArray();
      res.send(result);
    });

    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const nid = req.body;
      const option = { upsert: true };
      console.log(nid);

      const updatedNid = {
        $set: {
          nid: nid,
        },
      };
      const result = await userCollections.updateOne(
        filter,
        updatedNid,
        option
      );
      res.send(result);
    });

    app.put("/userss/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const nid = req.body;
      const option = { upsert: true };

      const updatedStat = {
        $set: {
          status: "verified",
        },
      };
      const result = await userCollections.updateOne(
        filter,
        updatedStat,
        option
      );
      res.send(result);
    });

    // post review
    app.post("/reviews", async (req, res) => {
      const user = req.body;
      const result = await reviewCollection.insertOne(user);
      res.send(result);
    });
    // getreview

    // post review

    app.get("/reviews/:service_id", async (req, res) => {
      const service_id = req.params.service_id;
      const query = { service_id };
      const result = await reviewCollection.find(query).toArray();
      res.send(result);
    });

    // get my clients
    app.get("/orders/:renterEmail", async (req, res) => {
      const renterEmail = req.params.renterEmail;
      const query = { renterEmail };
      const result = await myorderCollection.find(query).toArray();
      res.send(result);
    });
  } finally {
  }
}

run().catch((error) => console.log(error));

app.listen(port, () => {
  console.log("Simple node server is running");
});
