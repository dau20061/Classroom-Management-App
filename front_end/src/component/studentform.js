import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getStudents = async () => {
  const res = await axios.get(`${API_URL}/students`);
  return res.data;
};

export const createStudent = async (studentData) => {
  const res = await axios.post(`${API_URL}/addStudent`, studentData);
  return res.data;
};

export const deleteStudent = async (phone) => {
  const res = await axios.delete(`${API_URL}/student/${phone}`);
  return res.data;
};

export const updateStudent = async (phone, studentData) => {
  const res = await axios.put(`${API_URL}/editStudent/${phone}`, studentData);
  return res.data;
};
