import express from 'express';
import {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus,
  withdrawApplication,
} from '../controllers/application.controller.js';
import { isAuthenticated, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   GET /api/v1/application/apply/:id
 * @route   POST /api/v1/application/apply/:id
 * @desc    Job seeker applies for a job by job ID
 * @access  Private (Job Seeker)
 */
router.get(
  '/apply/:id',
  isAuthenticated,
  authorizeRoles('jobseeker'),
  applyJob
);

router.post(
  '/apply/:id',
  isAuthenticated,
  authorizeRoles('jobseeker'),
  applyJob
);

/**
 * @route   GET /api/v1/application/get
 * @desc    Get all applications submitted by logged-in jobseeker
 * @access  Private (Job Seeker)
 */
router.get(
  '/get',
  isAuthenticated,
  authorizeRoles('jobseeker'),
  getAppliedJobs
);

/**
 * @route   DELETE /api/v1/application/withdraw/:id
 * @route   DELETE /api/v1/application/:id
 * @desc    Job seeker withdraws a pending application
 * @access  Private (Job Seeker)
 */
router.delete(
  '/withdraw/:id',
  isAuthenticated,
  authorizeRoles('jobseeker'),
  withdrawApplication
);

router.delete(
  '/:id/withdraw',
  isAuthenticated,
  authorizeRoles('jobseeker'),
  withdrawApplication
);

/**
 * @route   GET /api/v1/application/applicants
 * @route   GET /api/v1/application/:id/applicants
 * @desc    Get all applicants for a specific job ID or all recruiter jobs
 * @access  Private (Recruiter, Admin)
 */
router.get(
  '/applicants',
  isAuthenticated,
  authorizeRoles('recruiter', 'admin'),
  getApplicants
);

router.get(
  '/:id/applicants',
  isAuthenticated,
  authorizeRoles('recruiter', 'admin'),
  getApplicants
);

/**
 * @route   POST /api/v1/application/status/:id/update
 * @route   PUT /api/v1/application/status/:id/update
 * @desc    Update application status (pending, reviewed, interview, accepted, selected, rejected)
 * @access  Private (Recruiter, Admin)
 */
router.post(
  '/status/:id/update',
  isAuthenticated,
  authorizeRoles('recruiter', 'admin'),
  updateStatus
);

router.put(
  '/status/:id/update',
  isAuthenticated,
  authorizeRoles('recruiter', 'admin'),
  updateStatus
);

export default router;

