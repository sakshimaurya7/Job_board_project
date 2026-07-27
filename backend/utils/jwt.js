import jwt from 'jsonwebtoken';

const getSecret = () => process.env.JWT_SECRET || 'jobsphere_super_secret_jwt_key_2026_production_ready';
const getExpiresIn = () => process.env.JWT_EXPIRES_IN || '1d';

/**
 * Generate a JWT token for a given user payload
 * @param {Object} user - User object containing _id or id, email, and role
 * @param {string} [expiresIn] - Optional override for token expiration duration
 * @returns {string} Signed JWT token
 */
const generateToken = (user, expiresIn) => {
  return jwt.sign(
    {
      id: user._id || user.id,
      email: user.email,
      role: user.role,
    },
    getSecret(),
    { expiresIn: expiresIn || getExpiresIn() }
  );
};

/**
 * Verify a JWT token
 * @param {string} token - Signed JWT token string
 * @returns {Object} Decoded payload
 */
const verifyToken = (token) => {
  return jwt.verify(token, getSecret());
};

export {
  generateToken,
  verifyToken,
};
