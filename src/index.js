import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./database/db.js";
import { Otp_sending } from "./utils/otp-service.js";
import { register } from "./controller/user.controller.js";

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
app.post("/register", register);

// VEERIFY USER EMAIL AND PHONE
app.post("/verify/:id", async (req, res)=>{

    const {id}=req.params
    const {enteredOTP}= req.body


})


// SERVER RUNNING IN PORT WITH MONGODB CONNECTION
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
});
