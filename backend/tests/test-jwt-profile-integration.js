import assert from 'assert';
import dotenv from 'dotenv';
import { generateToken, verifyToken } from '../utils/jwt.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import User from '../models/user.model.js';

dotenv.config();

async function testIntegration() {
  console.log('--- Testing JWT Token Generation & Auth Middleware Integration ---\n');

  // Test User
  const mockUser = {
    _id: '66a1b2c3d4e5f6a7b8c9d0e1',
    fullname: 'Test User',
    email: 'test@example.com',
    role: 'jobseeker',
    isActive: true,
  };

  // 1. Generate token using updated jwt.js (which uses process.env.JWT_SECRET)
  const token = generateToken(mockUser);
  console.log('1. Generated JWT Token successfully.');

  // 2. Verify token directly using verifyToken()
  const decoded = verifyToken(token);
  assert.strictEqual(decoded.id, mockUser._id);
  assert.strictEqual(decoded.email, mockUser.email);
  assert.strictEqual(decoded.role, mockUser.role);
  console.log('2. Verified token successfully with JWT_SECRET from environment.');

  // 3. Test auth.middleware.js isAuthenticated with Bearer token header
  const req = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const res = {
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };

  // Mock User.findById for isAuthenticated check
  User.findById = async (id) => {
    if (id === mockUser._id) {
      return mockUser;
    }
    return null;
  };

  let nextCalled = false;
  await isAuthenticated(req, res, () => {
    nextCalled = true;
  });

  assert.strictEqual(nextCalled, true, 'isAuthenticated should call next()');
  assert.strictEqual(req.user.email, mockUser.email, 'req.user should be populated');
  console.log('3. isAuthenticated middleware validated Bearer token and populated req.user successfully!\n');

  console.log('--- ALL JWT & PROFILE INTEGRATION TESTS PASSED ---');
}

testIntegration().catch((err) => {
  console.error('Integration test failed:', err);
  process.exit(1);
});
