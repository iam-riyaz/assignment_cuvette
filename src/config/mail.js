import nodemailer from "nodemailer";

const username = process.env.SMTP_USER;
const password = process.env.SMTP_PASS;

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: username, // email address form which we wanna send all mail to user
    pass: password, // in-app password of the Email  Address
  },
});
