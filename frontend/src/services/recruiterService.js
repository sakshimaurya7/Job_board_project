import companyService from "./companyService";
import jobService from "./jobService";
import applicationService from "./applicationService";

export const recruiterService = {
  // Dashboard & Stats
  getDashboardStats: async () => {
    return await jobService.getRecruiterStats();
  },

  // Company Operations
  getMyCompany: async () => {
    return await companyService.getMyCompany();
  },
  registerCompany: async (data) => {
    return await companyService.registerCompany(data);
  },
  updateCompany: async (id, data) => {
    return await companyService.updateCompany(id, data);
  },
  deleteCompany: async (id) => {
    return await companyService.deleteCompany(id);
  },

  // Job Operations
  getJobs: async () => {
    return await jobService.getRecruiterJobs();
  },
  getJobById: async (id) => {
    return await jobService.getJobById(id);
  },
  createJob: async (data) => {
    return await jobService.postJob(data);
  },
  updateJob: async (id, data) => {
    return await jobService.updateJob(id, data);
  },
  deleteJob: async (id) => {
    return await jobService.deleteJob(id);
  },

  // Applicant Operations
  getApplicants: async (jobId) => {
    return await applicationService.getApplicants(jobId);
  },
  updateApplicationStatus: async (applicationId, status) => {
    return await applicationService.updateApplicationStatus(applicationId, status);
  },
};

export default recruiterService;
