import axios from "axios";

// ✅ Axios instance pointing to backend API
const API = axios.create({
  baseURL: "https://employee-application-sigma.vercel.app/api",
  withCredentials: false
});

// ✅ Attach JWT token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
}, (error) => {
  return Promise.reject(error);
});

export default API;
