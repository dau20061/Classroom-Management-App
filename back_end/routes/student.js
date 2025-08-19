const express = require("express");
const router = express.Router();
const db = require("../firebase"); 

const studentRef = db.collection("students");

router.post("/addStudent", async (req, res) => {
  try {
    const { name, address, email, phone, role } = req.body;

    if (!name || !address || !email || !phone || !role) {
      return res.status(400).json({ error: "Please enter all required information" });
    }

    const checkEmail = await studentRef.where("email", "==", email).get();
    if (!checkEmail.empty) {
      return res.status(400).json({ error: "Email already exists in the system" });
    }

    const studentDoc = await studentRef.doc(phone).get();
    if (studentDoc.exists) {
      return res.status(400).json({ error: "Phone number already exists in the system" });
    }

    await studentRef.doc(phone).set({
      name,
      address,
      email,
      phone,
      role,
      password: null, 
      createdAt: new Date().toISOString(),
    });

  res.json({ message: "Student added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/students", async (req, res) => {
  try {
    const snapshot = await studentRef.get();
    const students = [];
    snapshot.forEach((doc) => {
      students.push({ id: doc.id, ...doc.data() });
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/editStudent/:phone", async (req, res) => {
  try {
    const { phone } = req.params;
    const { name,email, address, role } = req.body;

    const studentDoc = studentRef.doc(phone);
    const student = await studentDoc.get();

    if (!student.exists) {
      return res.status(404).json({ error: "Student not found" });
    }

    await studentDoc.update({
      name: name || student.data().name,
      address: address || student.data().address,
      role: role || student.data().role,
      email: email || student.data().email,
      updatedAt: new Date().toISOString(),
    });

  res.json({ message: "Student updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/student/:phone", async (req, res) => {
  try {
    const { phone } = req.params;

    const studentDoc = studentRef.doc(phone);
    const student = await studentDoc.get();

    if (!student.exists) {
      return res.status(404).json({ error: "Student not found" });
    }

    await studentDoc.delete();
  res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
