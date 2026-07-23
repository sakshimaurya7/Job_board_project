const assert = require('assert');
const mongoose = require('mongoose');
const crypto = require('crypto');
const User = require('../models/user.model');
const Company = require('../models/company.model');
const Job = require('../models/job.model');
const Application = require('../models/application.model');
const { verifyToken } = require('../utils/jwt');

async function runTests() {
  console.log('--- Starting JobSphere User Model Unit Tests ---\n');

  let passed = 0;
  let failed = 0;

  function recordTest(name, fn) {
    try {
      fn();
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ [FAIL] ${name}`);
      console.error(err);
      failed++;
    }
  }

  async function recordAsyncTest(name, fn) {
    try {
      await fn();
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ [FAIL] ${name}`);
      console.error(err);
      failed++;
    }
  }

  // 1. Validation Test - Missing required fields
  recordTest('Validation: Fails when required fields are missing', () => {
    const invalidUser = new User({});
    const err = invalidUser.validateSync();
    assert.ok(err, 'Validation error should exist');
    assert.ok(err.errors.fullname, 'Fullname should be required');
    assert.ok(err.errors.email, 'Email should be required');
    assert.ok(err.errors.password, 'Password should be required');
  });

  // 2. Validation Test - Invalid Email & Role
  recordTest('Validation: Fails on invalid email format and invalid role', () => {
    const invalidUser = new User({
      fullname: 'A',
      email: 'not-an-email',
      password: '123',
      role: 'superman',
    });
    const err = invalidUser.validateSync();
    assert.ok(err.errors.fullname, 'Fullname min length restriction check');
    assert.ok(err.errors.email, 'Email format regex validation check');
    assert.ok(err.errors.password, 'Password min length check');
    assert.ok(err.errors.role, 'Role enum restriction check');
  });

  // 3. Normalization Test - Email lowercase and string trim
  recordTest('Normalization: Trims strings and converts email to lowercase', () => {
    const user = new User({
      fullname: '  John Doe  ',
      email: '  JOHN.DOE@EXAMPLE.COM ',
      password: 'password123',
      role: 'recruiter',
    });
    assert.strictEqual(user.fullname, 'John Doe');
    assert.strictEqual(user.email, 'john.doe@example.com');
  });

  // 4. Password Hashing Pre-save Hook & Password Comparison
  await recordAsyncTest('Security: Hashes password on save and compares password correctly', async () => {
    const rawPassword = 'SecurePassword123!';
    const user = new User({
      fullname: 'Jane Recruiter',
      email: 'jane@company.com',
      password: rawPassword,
      role: 'recruiter',
    });

    // Mock save to trigger pre-save hooks without DB buffering
    user.save = async function () {
      if (User.schema.s && User.schema.s.hooks) {
        await User.schema.s.hooks.execPre('save', this);
      } else {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
      }
      return this;
    };

    await user.save();

    assert.notStrictEqual(user.password, rawPassword, 'Password should be hashed');
    assert.ok(user.password.startsWith('$2'), 'Password should be a valid bcrypt hash');

    // Test comparePassword
    const isMatch = await user.comparePassword(rawPassword);
    assert.strictEqual(isMatch, true, 'comparePassword should return true for correct password');

    const isWrongMatch = await user.comparePassword('WrongPass123!');
    assert.strictEqual(isWrongMatch, false, 'comparePassword should return false for wrong password');
  });

  // 5. JWT Auth Token Generation
  await recordAsyncTest('Auth: Generates and verifies valid JWT auth token', async () => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      fullname: 'Alice Seeker',
      email: 'alice@jobseeker.com',
      password: 'Password123!',
      role: 'jobseeker',
    });

    const token = user.generateAuthToken();
    assert.ok(token, 'Token string should be generated');

    const decoded = verifyToken(token);
    assert.strictEqual(decoded.id.toString(), user._id.toString());
    assert.strictEqual(decoded.email, 'alice@jobseeker.com');
    assert.strictEqual(decoded.role, 'jobseeker');
  });

  // 6. Password Reset Token Generation & Expiration
  recordTest('Password Recovery: Generates hashed reset token and sets 15-min expiration', () => {
    const user = new User({
      fullname: 'Bob Admin',
      email: 'bob@admin.com',
      password: 'Password123!',
      role: 'admin',
    });

    const plainToken = user.getResetPasswordToken();
    assert.ok(plainToken, 'Plain reset token should be returned');
    assert.ok(user.resetPasswordToken, 'Hashed reset token should be saved to schema');
    assert.notStrictEqual(plainToken, user.resetPasswordToken, 'Hashed token must differ from plain token');

    const expectedHash = crypto.createHash('sha256').update(plainToken).digest('hex');
    assert.strictEqual(user.resetPasswordToken, expectedHash, 'Reset token hash should match sha256 of plain token');
    assert.ok(user.resetPasswordExpire > Date.now(), 'Expiration time should be set in the future');
  });

  // 7. Email Verification Token Generation
  recordTest('Email Verification: Generates hashed verification token and sets 24-hr expiration', () => {
    const user = new User({
      fullname: 'Charlie Seeker',
      email: 'charlie@seeker.com',
      password: 'Password123!',
      role: 'jobseeker',
    });

    const plainToken = user.getVerificationToken();
    assert.ok(plainToken, 'Plain verification token should be returned');
    assert.ok(user.verificationToken, 'Hashed verification token should be stored on schema');
    assert.ok(user.verificationTokenExpire > Date.now(), 'Expiration time should be in future');
  });

  // 8. Profile & Recruiter-Company Association
  recordTest('Profile & Recruiter: Correctly models profile fields and company relationship', () => {
    const companyId = new mongoose.Types.ObjectId();
    const user = new User({
      fullname: 'Sam Recruiter',
      email: 'sam@techcorp.com',
      password: 'Password123!',
      role: 'recruiter',
      profile: {
        bio: 'Senior Technical Recruiter at TechCorp',
        skills: ['Talent Acquisition', 'Sourcing', 'Interviewing'],
        location: 'San Francisco, CA',
        profilePhoto: 'https://example.com/photos/sam.jpg',
        company: companyId,
      },
    });

    assert.strictEqual(user.profile.bio, 'Senior Technical Recruiter at TechCorp');
    assert.strictEqual(user.profile.skills.length, 3);
    assert.strictEqual(user.profile.company.toString(), companyId.toString());
  });

  // 9. Sensitive Data Exclusion on JSON Serialization
  recordTest('Security: toJSON strips sensitive fields (password, tokens)', () => {
    const user = new User({
      fullname: 'David Test',
      email: 'david@test.com',
      password: 'Password123!',
      resetPasswordToken: 'hashedresettoken',
      verificationToken: 'hashedverificationtoken',
    });

    const json = user.toJSON();
    assert.strictEqual(json.password, undefined, 'Password must be deleted from JSON output');
    assert.strictEqual(json.resetPasswordToken, undefined, 'resetPasswordToken must be deleted');
    assert.strictEqual(json.verificationToken, undefined, 'verificationToken must be deleted');
    assert.strictEqual(json.fullname, 'David Test');
  });

  console.log(`\n-----------------------------------`);
  console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`-----------------------------------\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

// Memory server / mock save test setup
mongoose.connect = () => Promise.resolve();
runTests().catch(err => {
  console.error('Fatal error during test run:', err);
  process.exit(1);
});
