import bcrypt from "bcrypt";
import ipInfo from "ipInfo";

import { User } from "../model/user.js";
import { Otp_sending } from "../utils/otp-service.js";


// REGISTER
export const register = async (req, res) => {
  try {
    
    const { firstName, lastName, email, phone, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const sentOTP= Otp_sending(email)
   

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
       
        const hashedOTP= await bcrypt.hash(sentOTP,salt)

        res.status(201).send({ user:savedUser,hashedOTP });
      })
      .catch((err) => {
        res.status(404).send("message" + err.message);
      });
  } catch (err) {}
};
