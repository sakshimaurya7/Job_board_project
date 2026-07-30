import axios from "axios";

// ─────────────────────────────────────────────────────────────────────────────
// Axios instance — points to the user API base
// Reuses the same token pattern as authService.js and companyService.js
// ─────────────────────────────────────────────────────────────────────────────
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1/user";

const profileApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request
profileApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jobhub_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const profileService = {
  /**
   * Fetch the current authenticated user's full profile
   * @route GET /api/v1/user/profile
   */
  getProfile: async () => {
    const response = await profileApi.get("/profile");
    return response.data;
  },

  /**
   * Update user profile fields.
   * Backend handles: fullname, phoneNumber, bio, skills, location,
   *                  profilePhoto, resume, resumeOriginalName
   * @route PUT /api/v1/user/profile/update
   * @param {Object} payload - Fields to update
   */
  updateProfile: async (payload) => {
    const response = await profileApi.put("/profile/update", payload);
    return response.data;
  },
};

export default profileService;
