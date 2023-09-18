import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./database/db.js";
import ipInfo from "ipInfo";
import bcrypt from "bcrypt";
import { User } from "./model/user.js";

const app = express();
dotenv.config();
app.use(express.json());

// ROOT ROUTE FOR TESTING
app.get("/", async (req, res) => {
  try {
    res.status(200).send("route is working");
  } catch (err) {
    res.status(500).send("route is not working");
  }
});

const PORT = process.env.PORT || 3000;

// REGISTER NEW USER
app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // GENERATE IP ADDRESS BASED DATA AND NEW USER CREATION METHOD
    ipInfo()
      .then(async (ipData) => {
        const newUser = new User({
          firstName,
          lastName,
          email,
          phone,
          password: passwordHash,
          ipData,
        });

        const savedUser = await newUser.save();
        res.status(201).send({ savedUser });
      })
      .catch((err) => {
        res.status(404).send("message" + err.message);
      });
  } catch (err) {
    res.status(404).send("message" + err.message);
  }
});

// SERVER RUNNING IN PORT WITH MONGODB CONNECTION
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
});
