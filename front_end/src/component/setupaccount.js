import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const sendEmailOTP = async (email) => {
  return axios.post(`${API_BASE}/LoginEmail`, { email });
};

export const verifyEmailOTP = async (email, otp) => {
  return axios.post(`${API_BASE}/ValidateAccessCode`, { email, otp });
};

export const setUserPassword = async (email, password) => {
  return axios.post(`${API_BASE}/setPassword`, { email, password });
};
