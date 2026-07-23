import express from 'express';
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.controller.js';
import {
  getProfile,
  updateProfile,
  updateUserStatus,
} from '../controllers/user.controller.js';
import { isAuthenticated, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

// ==========================================
// Authentication Routes
// ==========================================

/**
 * @route   POST /api/v1/user/register
 * @desc    Register a new user (Job Seeker, Recruiter, Admin)
 * @access  Public
 */
router.post('/register', register);

/**
 * @route   POST /api/v1/user/login
 * @desc    Authenticate user & get JWT token
 * @access  Public
 */
router.post('/login', login);

/**
 * @route   GET /api/v1/user/logout
 * @desc    Logout user & clear auth cookie
 * @access  Public / Private
 */
router.get('/logout', logout);

/**
 * @route   POST /api/v1/user/password/forgot
 * @desc    Generate password reset token & email notification request
 * @access  Public
 */
router.post('/password/forgot', forgotPassword);

/**
 * @route   POST /api/v1/user/password/reset/:token
 * @desc    Reset password using valid reset token
 * @access  Public
 */
router.post('/password/reset/:token', resetPassword);

// ==========================================
// Profile & Account Management Routes
// ==========================================

/**
 * @route   GET /api/v1/user/profile
 * @desc    Get current authenticated user profile
 * @access  Private (Authenticated Users)
 */
router.get('/profile', isAuthenticated, getProfile);

/**
 * @route   PUT /api/v1/user/profile/update
 * @desc    Update user profile (Bio, Skills, Location, Resume, Company)
 * @access  Private (Authenticated Users)
 */
router.put('/profile/update', isAuthenticated, updateProfile);

// ==========================================
// Admin Operations Routes
// ==========================================

/**
 * @route   PUT /api/v1/user/admin/status/:userId
 * @desc    Update user active/verification status or role
 * @access  Private (Admin Only)
 */
router.put(
  '/admin/status/:userId',
  isAuthenticated,
  authorizeRoles('admin'),
  updateUserStatus
);

export default router;
