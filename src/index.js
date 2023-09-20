import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./database/db.js";
import { register } from "./controller/user.controller.js";
import { verifyOtp } from "./controller/verifyOtp.controller.js";
import  {validation} from "./middleware/validation.js"
import { errors } from "celebrate";

const app = express();
dotenv.config();
app.use(express.json());

app.use(errors())





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
app.post("/register", validation, register);

// VEERIFY USER EMAIL AND PHONE
app.post("/verify", verifyOtp )


// SERVER RUNNING IN PORT WITH MONGODB CONNECTION
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
});

