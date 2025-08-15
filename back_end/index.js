require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/OTP");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
