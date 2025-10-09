import axios from "axios";

const API = axios.create({
  baseURL: "https://employee-application-mu.vercel.app/api", // backend API
  withCredentials: false
});

// Automatically attach JWT token
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
  },
  (error) => Promise.reject(error)
);

export default API;
