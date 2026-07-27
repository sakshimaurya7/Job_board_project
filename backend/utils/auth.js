import bcrypt from 'bcrypt';
import crypto from 'crypto';

/**
 * Hash a plain text password using bcrypt
 * @param {string} password
 * @returns {Promise<string>} Hashed password string
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Compare plain text candidate password with stored hashed password
 * @param {string} candidatePassword
 * @param {string} hashedPassword
 * @returns {Promise<boolean>} True if match, false otherwise
 */
const comparePassword = async (candidatePassword, hashedPassword) => {
  if (!hashedPassword) {
    throw new Error('Hashed password parameter is missing for comparison.');
  }
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

/**
 * Generate password reset token, sha256 hash, and 15-minute expiration
 * @returns {{ plainToken: string, hashedToken: string, expireTime: number }}
 */
const createResetPasswordToken = () => {
  const plainToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(plainToken)
    .digest('hex');
  const expireTime = Date.now() + 15 * 60 * 1000; // 15 mins

  return { plainToken, hashedToken, expireTime };
};

/**
 * Generate email verification token, sha256 hash, and 24-hour expiration
 * @returns {{ plainToken: string, hashedToken: string, expireTime: number }}
 */
const createVerificationToken = () => {
  const plainToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(plainToken)
    .digest('hex');
  const expireTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  return { plainToken, hashedToken, expireTime };
};

export { hashPassword, comparePassword, createResetPasswordToken, createVerificationToken };