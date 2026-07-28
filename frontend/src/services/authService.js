import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1/user";

const authApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token if present
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jobhub_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  login: async (credentials) => {
    const response = await authApi.post("/login", {
      email: credentials.email,
      password: credentials.password,
      role: credentials.role,
    });
    return response.data;
  },

  register: async (userData) => {
    const response = await authApi.post("/register", {
      fullname: userData.fullname,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      password: userData.password,
      role: userData.role,
    });
    return response.data;
  },

  logout: async () => {
    const response = await authApi.get("/logout");
    return response.data;
  },

  getProfile: async () => {
    const response = await authApi.get("/profile");
    return response.data;
  },
};

export default authService;
