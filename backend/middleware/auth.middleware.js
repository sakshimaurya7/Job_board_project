import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { verifyToken } from '../utils/jwt.js';

/**
 * Middleware to verify JWT token and authenticate user
 */
const isAuthenticated = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed. No token provided.',
      });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists.',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account has been deactivated or suspended.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token.',
      error: error.message,
    });
  }
};

/**
 * Middleware for Role-Based Access Control (RBAC)
 * @param  {...string} roles Allowed roles ('admin', 'recruiter', 'jobseeker')
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user ? req.user.role : 'Guest'}) is not authorized to access this resource. Required role(s): ${roles.join(', ')}`,
      });
    }
    next();
  };
};

export {
  isAuthenticated,
  authorizeRoles,
};
