import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const companyApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization header if JWT token exists in localStorage
companyApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jobhub_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const companyService = {
  /**
   * Fetch all companies
   * @param {Object} params - Query params (e.g. myCompanies)
   */
  getCompanies: async (params = {}) => {
    const response = await companyApi.get("/company/get", { params });
    return response.data;
  },

  /**
   * Fetch details of a specific company by ID
   * @param {string} id 
   */
  getCompanyById: async (id) => {
    const response = await companyApi.get(`/company/get/${id}`);
    return response.data;
  },

  /**
   * Register a new company for recruiter
   * @param {Object|FormData} companyData 
   */
  registerCompany: async (companyData) => {
    const isFormData = companyData instanceof FormData;
    const response = await companyApi.post("/company/register", companyData, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
    });
    return response.data;
  },

  /**
   * Update company information by ID
   * @param {string} id 
   * @param {Object|FormData} companyData 
   */
  updateCompany: async (id, companyData) => {
    const isFormData = companyData instanceof FormData;
    const response = await companyApi.put(`/company/update/${id}`, companyData, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
    });
    return response.data;
  },

  /**
   * Delete company by ID
   * @param {string} id 
   */
  deleteCompany: async (id) => {
    const response = await companyApi.delete(`/company/delete/${id}`);
    return response.data;
  },

  /**
   * Fetch companies belonging to logged in recruiter
   */
  getMyCompany: async () => {
    const response = await companyApi.get("/company/get", {
      params: { myCompanies: "true" },
    });
    return response.data;
  },

  /**
   * Search companies helper
   * @param {string} query 
   */
  searchCompanies: async (query = "") => {
    const response = await companyApi.get("/company/get");
    const companies = response.data?.companies || [];
    if (!query) return response.data;

    const searchTerm = query.toLowerCase().trim();
    const filtered = companies.filter(
      (c) =>
        c.name?.toLowerCase().includes(searchTerm) ||
        c.location?.toLowerCase().includes(searchTerm) ||
        c.description?.toLowerCase().includes(searchTerm)
    );

    return {
      ...response.data,
      count: filtered.length,
      companies: filtered,
    };
  },

  /**
   * Client-side filter helper for advanced filtering parameters
   * @param {Array} companies 
   * @param {Object} filters 
   */
  filterCompanies: (companies = [], filters = {}) => {
    let result = [...companies];
    const { name, industry, location, size, verifiedOnly, hiringOnly, sortBy } = filters;

    if (name) {
      const term = name.toLowerCase().trim();
      result = result.filter((c) => c.name?.toLowerCase().includes(term));
    }

    if (industry && industry !== "All") {
      const ind = industry.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.industry?.toLowerCase().includes(ind) ||
          c.description?.toLowerCase().includes(ind)
      );
    }

    if (location && location !== "All") {
      const loc = location.toLowerCase().trim();
      result = result.filter((c) => c.location?.toLowerCase().includes(loc));
    }

    if (size && size !== "All") {
      result = result.filter((c) => c.size === size || c.companySize === size);
    }

    if (verifiedOnly) {
      result = result.filter((c) => c.isVerified);
    }

    if (hiringOnly) {
      result = result.filter((c) => Array.isArray(c.jobs) && c.jobs.length > 0);
    }

    // Sort logic
    if (sortBy === "Alphabetical") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Most Jobs") {
      result.sort((a, b) => (b.jobs?.length || 0) - (a.jobs?.length || 0));
    } else if (sortBy === "Newest" || !sortBy) {
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return result;
  },
};

export default companyService;
