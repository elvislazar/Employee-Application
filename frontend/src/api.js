// src/api.js
import axios from "axios";

// ✅ Create Axios instance pointing to backend API
const API = axios.create({
  baseURL: "https://employee-application-sigma.vercel.app/api", // backend API root
  withCredentials: false, // not using cookies, JWT sent via header
});

// ✅ Intercept each request to attach the JWT token if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
}, (error) => {
  return Promise.reject(error);
});

export default API;
