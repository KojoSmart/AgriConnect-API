const nodemailer = require("nodemailer");
require("dotenv").config();

const mailTransporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER, // my email address
    pass: process.env.EMAIL_PASS, 
  },
});

module.exports = mailTransporter;
