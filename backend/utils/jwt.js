import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jobsphere_default_jwt_secret_key_2026';

/**
 * Generate a JWT token for a given user payload
 * @param {Object} user - User object containing _id, email, and role
 * @param {string} [expiresIn='1d'] - Token expiration duration
 * @returns {string} Signed JWT token
 */
const generateToken = (user, expiresIn = '1d') => {
  return jwt.sign(
    {
      id: user._id || user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn }
  );
};

/**
 * Verify a JWT token
 * @param {string} token - Signed JWT token string
 * @returns {Object} Decoded payload
 */
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export {
  generateToken,
  verifyToken,
};
