const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const db = require("../firebase");

const otpStore = {};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


router.post("/sendWelcomeEmail", async (req, res) => {
  const { email, name } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const snapshot = await db.collection("students").where("email", "==", email).get();
    if (snapshot.empty) {
      return res.status(404).json({ message: "Email does not exist in the system" });
    }

    await transporter.sendMail({
      from: `"System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to the system",
      html: `
        <h2>Hello ${name || "there"} 👋</h2>
        <p>Your account has been created successfully.</p>
        <p>Please visit the following link to log in and activate your account:</p>
        <a href="http://localhost:3000/signup">Login here</a>
      `,
    });

    return res.json({ message: "Welcome email has been sent!" });
  } catch (err) {
    console.error("Error sending welcome email:", err);
    return res.status(500).json({ message: "Failed to send welcome email", error: err.message });
  }
});

router.post("/LoginEmail", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const snapshot = await db.collection("students").where("email", "==", email).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "Email does not exist in the system" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, verified: false };

    await transporter.sendMail({
      from: `"System Manage School" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your account verification OTP code",
      html: `
        <h2>Your OTP code is: <b>${otp}</b></h2>
        <p>Please enter this code to verify your account.</p>
      `,
    });

    return res.json({ message: "OTP has been sent to your email!" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    return res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
});


router.post("/ValidateAccessCode", (req, res) => {
  const { email, otp } = req.body;

  if (!otpStore[email]) {
    return res.status(400).json({ message: "Email has not registered for OTP" });
  }

  if (otpStore[email].otp === otp) {
    otpStore[email].verified = true;
    return res.json({ message: "Verification successful" });
  } else {
    return res.status(400).json({ message: "Incorrect OTP" });
  }
});

router.post("/setPassword", async (req, res) => {
  const { email, password } = req.body;

  if (!otpStore[email] || !otpStore[email].verified) {
    return res.status(400).json({ message: "Email has not been verified by OTP" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const snapshot = await db.collection("students").where("email", "==", email).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "Student with this email not found" });
    }

    const studentDoc = snapshot.docs[0].id;
    await db.collection("students").doc(studentDoc).update({ password: hashedPassword });

    delete otpStore[email];

  return res.json({ message: "Password has been set successfully!" });
  } catch (err) {
    console.error("Error saving password:", err);
    return res.status(500).json({ message: "Error saving password", error: err.message });
  }
});

module.exports = router;
