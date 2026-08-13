const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");

const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ctgcy.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // all api routes goes from here
    const cosmoDB = client.db("cosmoSchoolDB");
    const userCollection = cosmoDB.collection("users");

    app.post("/users", async (req, res) => {
      try {
        const user = req.body;
        const userInfo = {
          ...user,
          role: "user",
          profileCompleted: false,
          createdAt: new Date(),
        };
        const email = userInfo.email;
        const existingUser = await userCollection.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: "User already exists" });
        }
        const result = await userCollection.insertOne(userInfo);
        res.send(result);
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB! Cosmo School Database is running...!!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Cosmo Server is running!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
