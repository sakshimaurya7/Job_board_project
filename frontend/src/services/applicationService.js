import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const applicationApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token if present
applicationApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jobhub_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const applicationService = {
  /**
   * Job seeker applies for a job by job ID
   * @param {string} jobId 
   */
  applyJob: async (jobId) => {
    const response = await applicationApi.post(`/application/apply/${jobId}`);
    return response.data;
  },

  /**
   * Get all applications submitted by logged-in jobseeker
   */
  getMyApplications: async () => {
    const response = await applicationApi.get("/application/get");
    return response.data;
  },

  /**
   * Get applicants for a specific job ID or all recruiter jobs if no jobId provided
   * @param {string} [jobId] 
   */
  getApplicants: async (jobId) => {
    const endpoint = jobId && jobId !== "all" ? `/application/${jobId}/applicants` : "/application/applicants";
    const response = await applicationApi.get(endpoint);
    return response.data;
  },

  /**
   * Update applicant status (pending, reviewed, interview, accepted/selected, rejected)
   * @param {string} applicationId 
   * @param {string} status 
   */
  updateApplicationStatus: async (applicationId, status) => {
    const response = await applicationApi.post(`/application/status/${applicationId}/update`, {
      status,
    });
    return response.data;
  },

  /**
   * Job seeker withdraws a pending application
   * @param {string} applicationId 
   */
  withdrawApplication: async (applicationId) => {
    const response = await applicationApi.delete(`/application/withdraw/${applicationId}`);
    return response.data;
  },
};

export default applicationService;
