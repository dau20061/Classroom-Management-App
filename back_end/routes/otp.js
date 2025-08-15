const express = require("express");
const router = express.Router();
const db = require("../firebase");
const twilio = require("twilio");

require("dotenv").config();
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const vnPhoneRegex = /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;  //--------"numberPhoneVN"-----------/
router.post("/createAccessCode", async (req, res) => {
  const { phoneNumber } = req.body;
  console.log("Received phone number:", phoneNumber);
  if (!vnPhoneRegex.test(phoneNumber)) {
    return res.status(400).json({ success: false, message: "Số điện thoại không hợp lệ" });
  }
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    // SAVE OTP FIRESTORE
    await db.collection("accessCodes").doc(phoneNumber).set({
      code,
      createdAt: new Date()
    });
    if (process.env.NODE_ENV === "production") {
      // SMS TWILIO
      await client.messages.create({
        body: `OTP: ${code}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber.startsWith("+84") ? phoneNumber : phoneNumber.replace(/^0/, "+84")
      });
      console.log(`OTP sent to ${phoneNumber}`);
    } else {
      console.log(`(OTP LOG TEST) OTP for ${phoneNumber}:${code}`);
    }
    res.json({ success: true, message: "OTP generated successfully" });
  } catch (error) {
    console.error("OTP Error:", error);
    res.status(500).json({ success: false, message: "Sent OTP faild" });
  }
});



router.post("/validateAccessCode", async (req, res) => {
  const { phoneNumber, accessCode } = req.body;

  const doc = await db.collection("accessCodes").doc(phoneNumber).get();
  const data = doc.data();

  if (data && data.code === accessCode) {
    const userDoc = await db.collection("users").doc(phoneNumber).get();
    const role = userDoc.exists ? userDoc.data().role : "student";
    await db.collection("accessCodes").doc(phoneNumber).delete();
    return res.json({ success: true, role });
  }
  res.status(400).json({ success: false, message: "Incorrect or expired OTP code" });
});

module.exports = router;
