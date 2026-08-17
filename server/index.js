const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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
    const usersCollection = cosmoDB.collection("users");
    const guardiansCollection = cosmoDB.collection("guardians");
    const studentsCollection = cosmoDB.collection("students");
    const guardianStudentsCollection = cosmoDB.collection("guardianStudents");

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
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: "User already exists" });
        }
        const result = await usersCollection.insertOne(userInfo);
        res.send(result);
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
      }
    });

    app.get("/users/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const user = await usersCollection.findOne({ email });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        res.send(user);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
      }
    });

    app.patch("/users/:id/account-type", async (req, res) => {
      try {
        const id = req.params.id;

        // MongoDB user ID ভুল হলে এখানেই request বন্ধ।
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({
            success: false,
            message: "Invalid user ID",
          });
        }

        const query = { _id: new ObjectId(id) };
        const { accountType } = req.body;

        const allowedAccountTypes = ["guardian", "teacher", "guardian_teacher"];

        // Guardian/Teacher/Both ছাড়া অন্য কিছু এলে request বন্ধ।
        if (!allowedAccountTypes.includes(accountType)) {
          return res.status(400).send({
            success: false,
            message: "Invalid account type",
          });
        }

        let roles = [];
        let onboardingStep = ""; // onboarding মানে নতুন user-কে ধাপে ধাপে account setup complete করানো। এখন তার পরবর্তী কাজ কী ?

        if (accountType === "guardian") {
          roles = ["guardian"];
          onboardingStep = "guardian-profile";
        }
        if (accountType === "teacher") {
          roles = ["teacher"];
          onboardingStep = "teacher-profile";
        }
        if (accountType === "guardian_teacher") {
          roles = ["guardian", "teacher"];
          onboardingStep = "guardian-profile";
        }

        const updateDoc = {
          $set: {
            accountType,
            roles,
            onboardingStep,
            profileCompleted: false,
            updatedAt: new Date(),
          },
        };

        const result = await usersCollection.updateOne(query, updateDoc);

        if (result.modifiedCount === 0) {
          return res.status(404).send({
            success: false,
            message: "User not found or account type not updated",
          });
        }

        const updatedUser = await usersCollection.findOne(query);
        res.send({
          success: true,
          message: "Account type updated successfully",
          user: updatedUser,
        });
      } catch (error) {
        console.error("Error updating account type:", error);
        res.status(500).send({
          success: false,
          message: "Internal server error while updating account type",
        });
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
