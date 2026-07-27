import mongoose from 'mongoose';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters long'],
      maxlength: [50, 'Full name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [emailRegex, 'Please provide a valid email address'],
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false,
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: '',
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'recruiter', 'jobseeker'],
        message: '{VALUE} is not a valid role. Allowed roles: admin, recruiter, jobseeker',
      },
      default: 'jobseeker',
      required: [true, 'User role is required'],
      index: true,
    },
    profile: {
      bio: {
        type: String,
        trim: true,
        maxlength: [500, 'Bio cannot exceed 500 characters'],
        default: '',
      },
      skills: [
        {
          type: String,
          trim: true,
        },
      ],
      location: {
        type: String,
        trim: true,
        default: '',
      },
      profilePhoto: {
        type: String,
        default: '',
      },
      resume: {
        type: String,
        default: '',
      },
      resumeOriginalName: {
        type: String,
        default: '',
      },
      // Recruiter association with Company collection
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        default: null,
        index: true,
      },
    },
    // Account Status
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // Password Reset
    resetPasswordToken: {
      type: String,
      default: null,
      select: false,
    },
    resetPasswordExpire: {
      type: Date,
      default: null,
      select: false,
    },
    // Email Verification
    verificationToken: {
      type: String,
      default: null,
      select: false,
    },
    verificationTokenExpire: {
      type: Date,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.resetPasswordToken;
        delete ret.resetPasswordExpire;
        delete ret.verificationToken;
        delete ret.verificationTokenExpire;
        delete ret.__v;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// Virtual relationship to Applications submitted by Job Seeker
userSchema.virtual('applications', {
  ref: 'Application',
  localField: '_id',
  foreignField: 'applicant',
});

// Virtual relationship to Jobs posted by Recruiter
userSchema.virtual('postedJobs', {
  ref: 'Job',
  localField: '_id',
  foreignField: 'created_by',
});

const User = mongoose.model('User', userSchema);

export default User;
