import express from 'express';
import {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus,
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
 * @route   GET /api/v1/application/:id/applicants
 * @desc    Get all applicants for a specific job ID
 * @access  Private (Recruiter, Admin)
 */
router.get(
  '/:id/applicants',
  isAuthenticated,
  authorizeRoles('recruiter', 'admin'),
  getApplicants
);

/**
 * @route   POST /api/v1/application/status/:id/update
 * @route   PUT /api/v1/application/status/:id/update
 * @desc    Update application status (pending, accepted, rejected)
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
