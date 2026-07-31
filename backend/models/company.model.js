import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    website: {
      type: String,
      trim: true,
      default: '',
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    logo: {
      type: String,
      default: '',
    },
    logoPublicId: {
      type: String,
      default: '',
    },
    banner: {
      type: String,
      default: '',
    },
    bannerPublicId: {
      type: String,
      default: '',
    },
    tagline: {
      type: String,
      trim: true,
      default: '',
    },
    industry: {
      type: String,
      trim: true,
      default: '',
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    companySize: {
      type: String,
      trim: true,
      default: '',
    },
    founded: {
      type: String,
      trim: true,
      default: '',
    },
    headquarters: {
      type: String,
      trim: true,
      default: '',
    },
    benefits: [
      {
        type: String,
        trim: true,
      },
    ],
    socialLinks: {
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      facebook: { type: String, default: '' },
      github: { type: String, default: '' },
    },
    // Recruiter who owns/manages this company
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// Virtual relationship to Jobs posted under this Company
companySchema.virtual('jobs', {
  ref: 'Job',
  localField: '_id',
  foreignField: 'company',
});

// Virtual alias for banner as coverImage
companySchema.virtual('coverImage').get(function () {
  return this.banner;
});


const Company = mongoose.model('Company', companySchema);

export default Company;
