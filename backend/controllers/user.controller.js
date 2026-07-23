import User from '../models/user.model';

/**
 * Get current authenticated user profile
 */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('profile.company');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.',
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user profile.',
      error: error.message,
    });
  }
};

/**
 * Update user profile (bio, skills, location, phone, photo, resume, company)
 */
export const updateProfile = async (req, res) => {
  try {
    const { fullname, phoneNumber, bio, skills, location, profilePhoto, resume, resumeOriginalName, companyId } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    if (fullname) user.fullname = fullname;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;

    if (!user.profile) user.profile = {};

    if (bio !== undefined) user.profile.bio = bio;
    if (location !== undefined) user.profile.location = location;
    if (profilePhoto !== undefined) user.profile.profilePhoto = profilePhoto;
    if (resume !== undefined) user.profile.resume = resume;
    if (resumeOriginalName !== undefined) user.profile.resumeOriginalName = resumeOriginalName;

    if (skills) {
      user.profile.skills = Array.isArray(skills)
        ? skills.map(s => s.trim())
        : skills.split(',').map(s => s.trim()).filter(Boolean);
    }

    if (companyId && user.role === 'recruiter') {
      user.profile.company = companyId;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update profile.',
      error: error.message,
    });
  }
};

/**
 * Admin action: Update user active or verification status
 */
export const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive, isVerified, role } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Target user not found.',
      });
    }

    if (isActive !== undefined) user.isActive = isActive;
    if (isVerified !== undefined) user.isVerified = isVerified;
    if (role && ['admin', 'recruiter', 'jobseeker'].includes(role)) user.role = role;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'User status updated successfully by Admin.',
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update user status.',
      error: error.message,
    });
  }
};
