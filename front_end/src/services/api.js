import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const createAccessCode = (phoneNumber) =>
  API.post("/createAccessCode", { phoneNumber });

export const validateAccessCode = (phoneNumber, accessCode) =>
  API.post("/validateAccessCode", { phoneNumber, accessCode });

export const addStudent = (name, phone, email, role, address) =>
  API.post("/addStudent", { name, phone, email, role, address });

export const getStudents = () => API.get("/students");
 