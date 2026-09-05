const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]); // এই লাইনটি সবার উপরে বসাবেন

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
    const teachersCollection = cosmoDB.collection("teachers");
    const studentsCollection = cosmoDB.collection("students");
    const guardianStudentsCollection = cosmoDB.collection("guardianStudents");

    // all users related api

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

    // guardian related apis
    app.post("/guardians", async (req, res) => {
      try {
        const guardianData = req.body;

        // -----------------------------
        // 1. Check guardian data
        // -----------------------------
        if (!guardianData) {
          return res.status(400).send({
            success: false,
            message: "Guardian data is required",
          });
        }

        // MongoDB user ID ভুল হলে এখানেই request বন্ধ।
        // 2. Validate MongoDB ObjectId
        if (!ObjectId.isValid(guardianData?.userId)) {
          return res.status(400).send({
            success: false,
            message: "Invalid user Id",
          });
        }
        // 3. Check required fields
        const user = await usersCollection.findOne({
          _id: new ObjectId(guardianData?.userId),
          email: guardianData?.guardianEmail,
        });

        // 4. Check user exists
        if (!user) {
          return res.status(400).send({
            success: false,
            message: "User not found",
          });
        }

        // 5. Check guardian already exists
        const existingGuardian = await guardiansCollection.findOne({
          userId: new ObjectId(guardianData?.userId),
          guardianEmail: guardianData?.guardianEmail,
        });

        if (existingGuardian) {
          return res.status(409).send({
            success: false,
            message: "Guardian profile already exists",
          });
        }
        // 6. Create guardian document
        const guardian = {
          userId: new ObjectId(guardianData?.userId),
          guardianName: guardianData.guardianName,
          guardianEmail: guardianData.guardianEmail,
          guardianGender: guardianData.guardianGender,
          guardianProfession: guardianData.guardianProfession,
          guardianPhoneNo: guardianData.guardianPhoneNo,
          guardianCampus: guardianData.guardianCampus,
          guardianPresentAddress: guardianData.guardianPresentAddress,

          children: guardianData.children || [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const result = await guardiansCollection.insertOne(guardian);

        // 6. user collection update kochi
        await usersCollection.updateOne(
          {
            _id: new ObjectId(guardianData?.userId),
          },
          {
            $set: {
              guardianProfileCompleted: true,

              // =================================================
              // এখন Guardian Profile শেষ।
              // তাই পরবর্তী ধাপ হবে Student Link।
              // =================================================
              onboardingStep: "guardian-student-link",

              updatedAt: new Date(),
            },
          },
        );

        res.status(201).send({
          success: true,
          message: "Guardian profile created",
          guardianId: result.insertedId,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send({
          success: false,
          message: "Internal server error",
        });
      }
    });

    app.post("/guardian/student/verify", async (req, res) => {
      try {
        const { studentId } = req.body;

        // Student ID না দিলে request বন্ধ
        if (!studentId?.trim()) {
          return res.status(400).send({
            success: false,
            message: "Student ID is required",
          });
        }

        /*
      Student ID normalize করছি।
      যেমন user যদি ছোট হাতের বা সামনে-পেছনে space দেয়,
      তাহলে search যেন সমস্যা না করে।
    */
        const normalizedStudentId = studentId.trim().toUpperCase();

        const student = await studentsCollection.findOne({
          studentId: normalizedStudentId,
        });

        if (!student) {
          return res.status(404).send({
            success: false,
            message: "Student not found",
          });
        }

        // inactive student link করতে দেব না
        if (student.status !== "active") {
          return res.status(400).send({
            success: false,
            message: "This student account is not active",
          });
        }

        /*
      Security:
      এখানে পুরো student document ফেরত দিচ্ছি না।
      শুধু Guardian যেন student চিনতে পারে,
      সেই minimum information ফেরত দিচ্ছি।
    */
        return res.send({
          success: true,
          student: {
            _id: student._id,
            studentId: student.studentId,
            name: student.name,
            className: student.className,
            section: student.section,
            roll: student.roll,
            photoURL: student.photoURL || "",
          },
        });
      } catch (error) {
        console.error("Student verify error:", error);

        return res.status(500).send({
          success: false,
          message: "Internal server error",
        });
      }
    });

    app.post("/guardian/student/link", async (req, res) => {
      try {
        const { userId, studentMongoId, relationship } = req.body;

        console.log("post guardian-student link", userId);

        const allowedRelationships = [
          "father",
          "mother",
          "legal_guardian",
          "other",
        ];

        if (!ObjectId.isValid(userId)) {
          return res.status(400).send({
            success: false,
            message: "Invalid user ID",
          });
        }

        if (!ObjectId.isValid(studentMongoId)) {
          return res.status(400).send({
            success: false,
            message: "Invalid student ID",
          });
        }

        if (!allowedRelationships.includes(relationship)) {
          return res.status(400).send({
            success: false,
            message: "Invalid relationship",
          });
        }

        /*
      প্রথমে user খুঁজছি।
      কারণ যে account থেকে link হচ্ছে,
      সেটা সত্যিই database-এ আছে কি না check করতে হবে।
    */
        const user = await usersCollection.findOne({
          _id: new ObjectId(userId),
        });

        if (!user) {
          return res.status(404).send({
            success: false,
            message: "User not found",
          });
        }

        /*
      Guardian profile খুঁজছি।
      users collection-এর _id এর সাথে
      guardians collection-এর userId match করবে।
    */
        const guardian = await guardiansCollection.findOne({
          userId: new ObjectId(userId),
        });
        console.log("guardian data", guardian);

        if (!guardian) {
          return res.status(400).send({
            success: false,
            message: "Please complete your guardian profile first",
          });
        }

        const student = await studentsCollection.findOne({
          _id: new ObjectId(studentMongoId),
        });

        if (!student) {
          return res.status(404).send({
            success: false,
            message: "Student not found",
          });
        }

        if (student.status !== "active") {
          return res.status(400).send({
            success: false,
            message: "Student is not active",
          });
        }

        /*
      একই Guardian যেন একই Student-কে
      দুইবার link করতে না পারে।

      guardianId + studentId pair খুঁজছি।
    */
        const existingLink = await guardianStudentsCollection.findOne({
          guardianId: guardian._id,
          studentId: student._id,
        });

        if (existingLink) {
          return res.status(409).send({
            success: false,
            message: "This student is already linked with your account",
          });
        }

        const guardianStudentRelation = {
          guardianId: guardian._id,

          studentId: student._id,

          relationship,

          /*
        এখন আমরা সরাসরি verified করছি না।
        পরে Admin verification system যোগ করলে
        pending -> verified করা যাবে।
      */
          verificationStatus: "pending",

          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const result = await guardianStudentsCollection.insertOne(
          guardianStudentRelation,
        );

        /*
      Guardian অন্তত একটি child link করেছে।
      এখন user-এর onboarding state update করছি।

      কিন্তু Admin verification পরে করবেন বলে
      এখন role = guardian final না করাই safer।
    */

        await usersCollection.updateOne(
          {
            _id: new ObjectId(userId),
          },
          {
            $set: {
              onboardingStep: "guardian-verification",
              // Admin এখন profile review করবে
              verificationStatus: "pending",
              verificationSubmittedAt: new Date(),

              updatedAt: new Date(),
            },
          },
        );

        return res.status(201).send({
          success: true,

          message: "Student linked successfully and waiting for verification",

          relationId: result.insertedId,
        });
      } catch (error) {
        console.error("Student link error:", error);

        return res.status(500).send({
          success: false,
          message: "Internal server error",
        });
      }
    });

    // teachers related apis
    app.post("/teachers", async (req, res) => {
      try {
        const teacherData = req.body;

        // -----------------------------
        // 1. Check teacher data
        // -----------------------------
        if (!teacherData) {
          return res.status(400).send({
            success: false,
            message: "Teacher data is required",
          });
        }

        // MongoDB user ID ভুল হলে এখানেই request বন্ধ।
        // 2. Validate MongoDB ObjectId
        if (!ObjectId.isValid(teacherData?.userId)) {
          return res.status(400).send({
            success: false,
            message: "Invalid user Id",
          });
        }
        // 3. Check required fields
        const user = await usersCollection.findOne({
          _id: new ObjectId(teacherData?.userId),
          email: teacherData?.teacherEmail,
        });

        // 4. Check user exists
        if (!user) {
          return res.status(400).send({
            success: false,
            message: "User not found",
          });
        }

        // 5. Check teacher already exists
        const existingTeacher = await teachersCollection.findOne({
          userId: new ObjectId(teacherData?.userId),
          teacherEmail: teacherData?.teacherEmail,
        });

        if (existingTeacher) {
          return res.status(409).send({
            success: false,
            message: "Teacher profile already exists",
          });
        }
        // 6. Create teacher document
        const teacher = {
          userId: new ObjectId(teacherData?.userId),
          teacherName: teacherData.teacherName,
          teacherEmail: teacherData.teacherEmail,
          teacherGender: teacherData.teacherGender,
          teacherProfession: teacherData.teacherProfession,
          teacherPhoneNo: teacherData.teacherPhoneNo,
          guardianCampus: teacherData.guardianCampus,
          guardianPresentAddress: teacherData.guardianPresentAddress,

          children: teacherData.children || [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const result = await teachersCollection.insertOne(teacher);

        // 6. user collection update kochi
        await usersCollection.updateOne(
          {
            _id: new ObjectId(teacherData?.userId),
          },
          {
            $set: {
              teacherProfileCompleted: true,

              // =================================================
              // এখন Teacher Profile শেষ।
              // তাই পরবর্তী ধাপ হবে Student Link।
              // =================================================
              onboardingStep: "teacher-student-link",

              updatedAt: new Date(),
            },
          },
        );

        res.status(201).send({
          success: true,
          message: "Teacher profile created",
          teacherId: result.insertedId,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send({
          success: false,
          message: "Internal server error",
        });
      }
    });

    // all admin's apis

    app.get("/admin/users", async (req, res) => {
      // const query = {};
      // query.$or = {
      //   verificationStatus: "pending",
      // };
      const cursor = usersCollection
        .find({ verificationStatus: "pending" })
        .sort({ verificationSubmittedAt: -1 });
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/admin/dashboard/stats", async (req, res) => {
      try {
        /*
      ================================================
      Student count
      শুধু active student count করছি।
      ================================================
    */
        const students = await studentsCollection.countDocuments({
          status: "active",
        });

        /*
      ================================================
      Verified Guardian count

      Guardian এবং Guardian+Teacher—
      দুই ধরনের account-এর মধ্যেই Guardian role থাকতে পারে।

      তাই roles array ব্যবহার করছি।
      ================================================
    */
        const guardians = await usersCollection.countDocuments({
          roles: "guardian",
          verificationStatus: "approved",
        });
        /*
      ================================================
      Verified Teacher count
      ================================================
    */
        const teachers = await usersCollection.countDocuments({
          roles: "teacher",
          verificationStatus: "approved",
        });
        console.log("Teacher role", teachers.roles);
        /*
      ================================================
      কতগুলো account এখন Admin approval-এর অপেক্ষায় আছে
      ================================================
    */
        const pendingVerifications = await usersCollection.countDocuments({
          verificationStatus: "pending",
        });
        return res.send({
          success: true,

          stats: {
            students,
            guardians,
            teachers,
            pendingVerifications,
          },
        });
      } catch (error) {
        console.error("Admin dashboard stats error:", error);

        return res.status(500).send({
          success: false,
          message: "Failed to load admin dashboard statistics",
        });
      }
    });

    app.get("/admin/users/:userId/details", async (req, res) => {
      try {
        const { userId } = req.params;

        // =====================================================
        // URL থেকে পাওয়া userId valid MongoDB ObjectId কি না
        // সেটা প্রথমে check করছি
        // =====================================================
        if (!ObjectId.isValid(userId)) {
          return res.status(400).send({
            success: false,
            message: "Invalid user ID",
          });
        }

        const userObjectId = new ObjectId(userId);

        // =====================================================
        // ১. users collection থেকে মূল user account আনছি
        // =====================================================
        const user = await usersCollection.findOne({
          _id: userObjectId,
        });

        if (!user) {
          return res.status(404).send({
            success: false,
            message: "User not found",
          });
        }

        // =====================================================
        // ২. guardians collection থেকে guardian profile আনছি
        // =====================================================
        const guardian = await guardiansCollection.findOne({
          userId: userObjectId,
        });

        let linkedStudents = [];

        // =====================================================
        // Guardian profile থাকলে guardianStudents collection
        // থেকে linked relationship বের করবো
        // =====================================================
        if (guardian) {
          const relations = await guardianStudentsCollection
            .find({
              guardianId: guardian._id,
            })
            .toArray();

          // ===================================================
          // প্রতিটি relation-এর studentId দিয়ে
          // students collection থেকে student information আনছি
          // ===================================================
          for (const relation of relations) {
            const student = await studentsCollection.findOne({
              _id: relation.studentId,
            });

            if (student) {
              linkedStudents.push({
                relationId: relation._id,
                relationship: relation.relationship,
                verificationStatus: relation.verificationStatus,

                student: {
                  _id: student._id,
                  studentId: student.studentId,
                  name: student.name,
                  className: student.className,
                  section: student.section,
                  roll: student.roll,
                  photoURL: student.photoURL || "",
                  status: student.status,
                },
              });
            }
          }
        }

        return res.send({
          success: true,

          data: {
            user,
            guardian,
            linkedStudents,
          },
        });
      } catch (error) {
        console.error("Admin user details error:", error);

        return res.status(500).send({
          success: false,
          message: "Failed to load user details",
        });
      }
    });

    // approve user as guardian, teacher or admin
    app.patch("/admin/users/:userId/accept", async (req, res) => {
      try {
        const { userId } = req.params;

        if (!ObjectId.isValid(userId)) {
          return res.status(400).send({
            success: false,
            message: "Invalid user ID",
          });
        }

        const userObjectId = new ObjectId(userId);

        const user = await usersCollection.findOne({
          _id: userObjectId,
        });

        if (!user) {
          return res.status(404).send({
            success: false,
            message: "User not found",
          });
        }

        // =====================================================
        // শুধু pending verification user-ই approve করা যাবে
        // =====================================================
        if (user.verificationStatus !== "pending") {
          return res.status(400).send({
            success: false,
            message: "This user is not pending verification",
          });
        }

        let finalRole = "user";
        let finalRoles = [];

        // =====================================================
        // Account type অনুযায়ী final role set করছি
        // =====================================================

        if (user.accountType === "guardian") {
          finalRole = "guardian";
          finalRoles = ["guardian"];
        }

        if (user.accountType === "teacher") {
          finalRole = "teacher";
          finalRoles = ["teacher"];
        }

        if (user.accountType === "guardian_teacher") {
          finalRole = "guardian_teacher";
          finalRoles = ["guardian", "teacher"];
        }

        // =====================================================
        // Invalid account type হলে approval বন্ধ
        // =====================================================
        if (finalRole === "user") {
          return res.status(400).send({
            success: false,
            message: "Invalid account type",
          });
        }

        // =====================================================
        // users collection update করছি
        // =====================================================
        await usersCollection.updateOne(
          {
            _id: userObjectId,
          },
          {
            $set: {
              role: finalRole,
              roles: finalRoles,

              profileCompleted: true,

              verificationStatus: "approved",

              onboardingStep: "completed",

              verifiedAt: new Date(),

              updatedAt: new Date(),
            },

            // =================================================
            // আগে reject হয়ে থাকলে rejection info remove করছি
            // =================================================
            $unset: {
              rejectionReason: "",
              rejectedAt: "",
            },
          },
        );

        // =====================================================
        // Guardian হলে linked student relation-গুলোকেও
        // approved করছি
        // =====================================================
        if (
          user.accountType === "guardian" ||
          user.accountType === "guardian_teacher"
        ) {
          const guardian = await guardiansCollection.findOne({
            userId: userObjectId,
          });

          if (guardian) {
            await guardianStudentsCollection.updateMany(
              {
                guardianId: guardian._id,
              },
              {
                $set: {
                  verificationStatus: "approved",
                  verifiedAt: new Date(),
                  updatedAt: new Date(),
                },
              },
            );
          }
        }

        return res.send({
          success: true,
          message: "User approved successfully",
        });
      } catch (error) {
        console.error("Approve user error:", error);

        return res.status(500).send({
          success: false,
          message: "Failed to approve user",
        });
      }
    });

    // reject user from any role
    app.patch("/admin/users/:userId/reject", async (req, res) => {
      try {
        const { userId } = req.params;

        const { reason } = req.body;

        if (!ObjectId.isValid(userId)) {
          return res.status(400).send({
            success: false,
            message: "Invalid user ID",
          });
        }

        // =====================================================
        // Reject করার কারণ না দিলে request বন্ধ
        // =====================================================
        if (!reason?.trim()) {
          return res.status(400).send({
            success: false,
            message: "Rejection reason is required",
          });
        }

        const userObjectId = new ObjectId(userId);

        const user = await usersCollection.findOne({
          _id: userObjectId,
        });

        if (!user) {
          return res.status(404).send({
            success: false,
            message: "User not found",
          });
        }

        if (user.verificationStatus !== "pending") {
          return res.status(400).send({
            success: false,
            message: "This user is not pending verification",
          });
        }

        // =====================================================
        // Rejected হলে user-কে কোন onboarding step-এ
        // ফিরিয়ে দেব সেটা account type অনুযায়ী ঠিক করছি
        // =====================================================
        let nextStep = "";

        if (user.accountType === "guardian") {
          nextStep = "guardian-student-link";
        }

        if (user.accountType === "teacher") {
          nextStep = "teacher-profile";
        }

        if (user.accountType === "guardian_teacher") {
          nextStep = "guardian-student-link";
        }

        await usersCollection.updateOne(
          {
            _id: userObjectId,
          },
          {
            $set: {
              verificationStatus: "rejected",

              rejectionReason: reason.trim(),

              profileCompleted: false,

              onboardingStep: nextStep,

              rejectedAt: new Date(),

              updatedAt: new Date(),
            },
          },
        );

        return res.send({
          success: true,
          message: "User verification rejected",
        });
      } catch (error) {
        console.error("Reject user error:", error);

        return res.status(500).send({
          success: false,
          message: "Failed to reject user",
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
