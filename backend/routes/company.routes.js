import express from 'express';
import {
  registerCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from '../controllers/company.controller.js';
import { isAuthenticated, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/v1/company/register
 * @desc    Register / create a new company
 * @access  Private (Recruiter, Admin)
 */
router.post(
  '/register',
  isAuthenticated,
  authorizeRoles('recruiter', 'admin'),
  registerCompany
);

/**
 * @route   GET /api/v1/company/get
 * @desc    Get companies created by logged in recruiter / admin
 * @access  Private (Authenticated Users)
 */
router.get('/get', isAuthenticated, getCompanies);

/**
 * @route   GET /api/v1/company/get/:id
 * @desc    Get details of a specific company by ID
 * @access  Private (Authenticated Users)
 */
router.get('/get/:id', isAuthenticated, getCompanyById);

/**
 * @route   PUT /api/v1/company/update/:id
 * @desc    Update company details by ID
 * @access  Private (Recruiter, Admin)
 */
router.put(
  '/update/:id',
  isAuthenticated,
  authorizeRoles('recruiter', 'admin'),
  updateCompany
);

/**
 * @route   DELETE /api/v1/company/delete/:id
 * @desc    Delete company by ID
 * @access  Private (Recruiter, Admin)
 */
router.delete(
  '/delete/:id',
  isAuthenticated,
  authorizeRoles('recruiter', 'admin'),
  deleteCompany
);

export default router;
