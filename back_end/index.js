require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/OTP");
const studentRoutes = require("./routes/student");
const emailOTPRoutes = require("./routes/emailOTP");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", studentRoutes);
app.use("/api", emailOTPRoutes); 

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
