import bcrypt from "bcrypt";
import ipInfo from "ipInfo";

import { User } from "../model/user.js";
import { Otp_sending } from "../utils/otp-service.js";

// REGISTER - send hased data in response and send OTP to the email/phone 
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const sentOTP = Otp_sending(email);

    // GENERATE IP ADDRESS BASED DATA and SENDING OTP with HASHED PASSWORD and OTHER DATA TO USER
    ipInfo()
      .then(async (ipData) => {
        const hashedOTP = await bcrypt.hash(sentOTP, salt);
        const savedUser = {
          firstName,
          lastName,
          email,
          phone,
          ipData,
          password: passwordHash,
        };

        res
          .status(200)
          .send({
            status: "success",
            message: "OTP sent to email/phone",
            userData: savedUser,
            hashedOTP,
          });
      })
      .catch((err) => {
        return res
          .status(404)
          .send({
            status: "failure",
            message: "Error sending OTP to email/phone",
          });
      });
  } catch (err) {
    res.status(404).send({ status: "failure", message: err.message });
  }
};
