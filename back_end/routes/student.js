const express = require("express");
const router = express.Router();
const db = require("../firebase");

const studentRef = db.collection("students");

router.post("/addStudent", async (req, res) => {
  try {
    const { name, address,email, phone, role } = req.body;

    if (!name || !address ||!email || !phone || !role) {
      return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin" });
    }

    await studentRef.doc(phone).set({
      name,
      address,
      email,
      phone,
      role,
      createdAt: new Date().toISOString(),
    });

    res.json({ message: "Thêm học sinh thành công" });
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
      return res.status(404).json({ error: "Không tìm thấy học sinh" });
    }

    await studentDoc.update({
      name: name || student.data().name,
      address: address || student.data().address,
      role: role || student.data().role,
      email: email || student.data().email,
      updatedAt: new Date().toISOString(),
    });

    res.json({ message: "Cập nhật học sinh thành công" });
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
      return res.status(404).json({ error: "Không tìm thấy học sinh" });
    }

    await studentDoc.delete();
    res.json({ message: "Xóa học sinh thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
