import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const contactApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization header if JWT token is stored in localStorage
contactApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jobhub_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const contactService = {
  /**
   * Send a contact form message
   * @param {Object} payload
   * @param {string} payload.fullName
   * @param {string} payload.email
   * @param {string} [payload.phone]
   * @param {"jobseeker"|"recruiter"|"visitor"} payload.role
   * @param {"inquiry"|"support"|"issue"|"recruiter"|"partnership"|"other"} payload.subject
   * @param {string} payload.message
   * @returns {Promise<Object>}
   */
  sendContactMessage: async (payload) => {
    const response = await contactApi.post("/contact", payload);
    return response.data;
  },
};

export default contactService;
