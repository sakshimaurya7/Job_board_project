import express from 'express';
import {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
  updateJob,
  deleteJob,
} from '../controllers/job.controller.js';
import { isAuthenticated, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/v1/job/post
 * @desc    Post a new job listing
 * @access  Private (Recruiter, Admin)
 */
router.post(
  '/post',
  isAuthenticated,
  authorizeRoles('recruiter', 'admin'),
  postJob
);

/**
 * @route   GET /api/v1/job/get
 * @desc    Get all job listings
 * @access  Private / Public
 */
router.get('/get', isAuthenticated, getAllJobs);

/**
 * @route   GET /api/v1/job/getadminjobs
 * @desc    Get jobs created by the logged in recruiter / admin
 * @access  Private (Recruiter, Admin)
 */
router.get(
  '/getadminjobs',
  isAuthenticated,
  authorizeRoles('recruiter', 'admin'),
  getAdminJobs
);

/**
 * @route   GET /api/v1/job/get/:id
 * @desc    Get job listing details by ID
 * @access  Private / Public
 */
router.get('/get/:id', isAuthenticated, getJobById);

/**
 * @route   PUT /api/v1/job/update/:id
 * @desc    Update job listing details by ID
 * @access  Private (Recruiter, Admin)
 */
router.put(
  '/update/:id',
  isAuthenticated,
  authorizeRoles('recruiter', 'admin'),
  updateJob
);

/**
 * @route   DELETE /api/v1/job/delete/:id
 * @desc    Delete job listing by ID
 * @access  Private (Recruiter, Admin)
 */
router.delete(
  '/delete/:id',
  isAuthenticated,
  authorizeRoles('recruiter', 'admin'),
  deleteJob
);

export default router;
