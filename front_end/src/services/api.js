import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const createAccessCode = (phoneNumber) =>
  API.post("/createAccessCode", { phoneNumber });

export const validateAccessCode = (phoneNumber, accessCode) =>
  API.post("/validateAccessCode", { phoneNumber, accessCode });
