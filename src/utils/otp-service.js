
import { transporter } from "../config/mail.js";

export const Otp_sending =  (email) => {
  
  
  const otpLength=6
    // GENERATE OTP
    const generateOTP = (otpLength) => {
      const min = Math.pow(10, otpLength - 1);
      const max = Math.pow(10, otpLength) - 1;
      const otp = Math.floor(Math.random() * (max - min + 1)) + min; // Generate a random number within the range
      return otp.toString().padStart(otpLength, "0"); // Convert to a string and pad with leading zeros if needed
    };
    const otp = generateOTP(otpLength);

    // Email sending variabls 
    const emailSendingOptions = {
      to: email, //required
      subject: "OTP verification", //optional
      html: `<h1>Your OTP is: ${otp}</h1>`,
    };

    const mailSenderFunction = async () => {
      await transporter.sendMail(emailSendingOptions);
    };

    
    mailSenderFunction()
    return otp
  
};
