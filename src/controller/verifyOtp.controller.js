import bcrypt from "bcrypt";
import { User } from "../model/user.js";

// VERIFY- verify the otp and save user data to the database (registration)
export const verifyOtp = async (req, res) => {
  try {
    const {
      enteredOTP,
      hashedOTP,
      firstName,
      lastName,
      email,
      phone,
      ipData,
      password,
    } = req.body;

    const isOtpMatched = await bcrypt.compare(enteredOTP, hashedOTP);
    if (isOtpMatched) {
      const newUser = new User({
        firstName,
        lastName,
        email,
        phone,
        password,
        ipData,
      });

      const savedUser = await newUser.save();

      res.status(201).send({
        status: "success",
        message: "OTP verified and user registered successfully",
        registeredUser:savedUser
      });
    } else {
      res.status(404).send({ status: "failure", message: "OTP is not valid" });
    }
  } catch (err) {
    res.status(500).send({ status: "faliure", message: err.message });
  }
};
