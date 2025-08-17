import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Page/login_form/login";
import QuanLyHocVien from "../Page/manage_teacher/teacher";
function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<QuanLyHocVien />} />
    </Routes>
  );
}

export default AppRouter;
