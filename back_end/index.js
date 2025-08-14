const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// create OTP 
app.post("/createAccessCode", (req, res) => {
  const { phoneNumber } = req.body;
  console.log("Received phone number:", phoneNumber);
  const code = Math.floor(100000 + Math.random() * 900000);
  console.log("Generated code:", code);
  res.json({ success: true, code }); 
});
// verify OTP
app.post("/validateAccessCode", (req, res) => {
  const { phoneNumber, accessCode } = req.body;
  console.log("Verify for:", phoneNumber, "with code:", accessCode);

  res.json({ success: true, role: "student" });
});
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
