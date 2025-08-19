import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Page/login_form/login";
import QuanLyHocVien from "../Page/manage_teacher/teacher";
import EmailAuth from "../Page/verivyOTP/verifyotp";
function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/teacher" element={<QuanLyHocVien />} />
      <Route path="/signup" element={<EmailAuth />} />
    </Routes>
  );
}

export default AppRouter;
