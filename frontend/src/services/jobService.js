import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const jobApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization header if JWT token is stored in localStorage
jobApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jobhub_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const jobService = {
  /**
   * Fetch all job listings
   */
  getAllJobs: async () => {
    const response = await jobApi.get("/job/get");
    return response.data;
  },

  /**
   * Fetch job details by ID
   * @param {string} id 
   */
  getJobById: async (id) => {
    const response = await jobApi.get(`/job/get/${id}`);
    return response.data;
  },

  /**
   * Apply for a job by job ID
   * @param {string} jobId 
   */
  applyJob: async (jobId) => {
    // Backend supports both POST and GET for /application/apply/:id
    const response = await jobApi.post(`/application/apply/${jobId}`);
    return response.data;
  },

  /**
   * Get applications submitted by logged-in jobseeker
   */
  getAppliedJobs: async () => {
    const response = await jobApi.get("/application/get");
    return response.data;
  },
};

export default jobService;
