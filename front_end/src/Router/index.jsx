import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Page/login_form/login";
function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default AppRouter;
