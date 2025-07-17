const nodemailer = require("nodemailer");
require("dotenv").config();
const sendEmail = async ({ to, subject, html }) => {
  try {
    // Create transporter using your email service
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,     // your email address
        pass: process.env.EMAIL_PASS,     // your email password or app password
      },
    });

    const mailOptions = {
      from: `"AgriConnect " <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(" Email sent to", to);
  } catch (error) {
    console.error(" Email sending failed:", error.message);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
