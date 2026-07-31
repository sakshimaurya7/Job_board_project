import Company from '../models/company.model.js';
import User from '../models/user.model.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

/**
 * Helper to safely parse JSON strings or return original object
 */
const safeParseJSON = (value) => {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
  return value;
};

/**
 * Register/Create a new Company with optional image uploads
 */
const registerCompany = async (req, res) => {
  try {
    const {
      companyName,
      name,
      description,
      website,
      location,
      logo,
      banner,
      coverImage,
      tagline,
      industry,
      phone,
      companySize,
      founded,
      headquarters,
      benefits,
      socialLinks,
    } = req.body;

    const nameToUse = (companyName || name || '').trim();

    if (!nameToUse) {
      return res.status(400).json({
        success: false,
        message: 'Company name is required.',
      });
    }

    // Check if company with same name already exists
    const existingCompany = await Company.findOne({ name: nameToUse });
    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: 'Company with this name already exists.',
      });
    }

    let parsedBenefits = [];
    const rawBenefits = safeParseJSON(benefits);
    if (Array.isArray(rawBenefits)) {
      parsedBenefits = rawBenefits.map((b) => String(b).trim()).filter(Boolean);
    } else if (typeof rawBenefits === 'string') {
      parsedBenefits = rawBenefits.split(',').map((b) => b.trim()).filter(Boolean);
    }

    let parsedSocialLinks = safeParseJSON(socialLinks) || {};

    let logoUrl = logo || '';
    let logoPublicId = '';
    let bannerUrl = banner || coverImage || '';
    let bannerPublicId = '';

    // Process Logo file upload if present
    const logoFile = req.files?.logo?.[0];
    if (logoFile) {
      const uploadResult = await uploadToCloudinary(logoFile.buffer, 'jobsphere/logos');
      logoUrl = uploadResult.url;
      logoPublicId = uploadResult.public_id;
    }

    // Process Banner / Cover file upload if present
    const bannerFile = req.files?.banner?.[0] || req.files?.coverImage?.[0];
    if (bannerFile) {
      const uploadResult = await uploadToCloudinary(bannerFile.buffer, 'jobsphere/banners');
      bannerUrl = uploadResult.url;
      bannerPublicId = uploadResult.public_id;
    }

    const company = await Company.create({
      name: nameToUse,
      description: description || '',
      website: website || '',
      location: location || '',
      logo: logoUrl,
      logoPublicId,
      banner: bannerUrl,
      bannerPublicId,
      tagline: tagline || '',
      industry: industry || '',
      phone: phone || '',
      companySize: companySize || '',
      founded: founded || '',
      headquarters: headquarters || '',
      benefits: parsedBenefits,
      socialLinks: parsedSocialLinks,
      userId: req.user._id || req.user.id,
    });

    // Link company to recruiter profile if not already set
    if (req.user && req.user.role === 'recruiter') {
      await User.findByIdAndUpdate(req.user._id || req.user.id, {
        'profile.company': company._id,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Company registered successfully.',
      company,
    });
  } catch (error) {
    console.error('Error in registerCompany:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to register company.',
      error: error.message,
    });
  }
};

/**
 * Get companies (all companies for candidate discovery or recruiter's own companies when myCompanies=true)
 */
const getCompanies = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    let query = {};

    if (req.user?.role === 'recruiter' && req.query.myCompanies === 'true') {
      query = { userId };
    }

    const companies = await Company.find(query).populate('jobs').sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve companies.',
      error: error.message,
    });
  }
};

/**
 * Get company by ID
 */
const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId).populate('jobs');

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found.',
      });
    }

    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve company details.',
      error: error.message,
    });
  }
};

/**
 * Update company information with image upload/replacement support
 */
const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    let company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found.',
      });
    }

    // Verify recruiter ownership or admin privilege
    const userId = req.user._id || req.user.id;
    if (company.userId.toString() !== userId.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this company.',
      });
    }

    const {
      name,
      description,
      website,
      location,
      tagline,
      industry,
      phone,
      companySize,
      founded,
      headquarters,
      benefits,
      socialLinks,
      removeLogo,
      removeBanner,
      logo: bodyLogo,
      banner: bodyBanner,
      coverImage: bodyCoverImage,
    } = req.body;

    const updateData = {};
    if (name) updateData.name = name.trim();
    if (description !== undefined) updateData.description = description;
    if (website !== undefined) updateData.website = website;
    if (location !== undefined) updateData.location = location;
    if (tagline !== undefined) updateData.tagline = tagline;
    if (industry !== undefined) updateData.industry = industry;
    if (phone !== undefined) updateData.phone = phone;
    if (companySize !== undefined) updateData.companySize = companySize;
    if (founded !== undefined) updateData.founded = founded;
    if (headquarters !== undefined) updateData.headquarters = headquarters;

    if (benefits !== undefined) {
      const rawBenefits = safeParseJSON(benefits);
      if (Array.isArray(rawBenefits)) {
        updateData.benefits = rawBenefits.map((b) => String(b).trim()).filter(Boolean);
      } else if (typeof rawBenefits === 'string') {
        updateData.benefits = rawBenefits.split(',').map((b) => b.trim()).filter(Boolean);
      }
    }

    if (socialLinks !== undefined) {
      const parsedSocial = safeParseJSON(socialLinks);
      updateData.socialLinks = {
        ...company.socialLinks,
        ...(typeof parsedSocial === 'object' ? parsedSocial : {}),
      };
    }

    // --- LOGO PROCESSING ---
    const logoFile = req.files?.logo?.[0];
    if (logoFile) {
      // Delete old logo from Cloudinary if replacing
      if (company.logoPublicId) {
        await deleteFromCloudinary(company.logoPublicId);
      }
      const uploadResult = await uploadToCloudinary(logoFile.buffer, 'jobsphere/logos');
      updateData.logo = uploadResult.url;
      updateData.logoPublicId = uploadResult.public_id;
    } else if (removeLogo === 'true' || removeLogo === true || bodyLogo === '') {
      if (company.logoPublicId) {
        await deleteFromCloudinary(company.logoPublicId);
      }
      updateData.logo = '';
      updateData.logoPublicId = '';
    }

    // --- BANNER / COVER IMAGE PROCESSING ---
    const bannerFile = req.files?.banner?.[0] || req.files?.coverImage?.[0];
    if (bannerFile) {
      // Delete old banner from Cloudinary if replacing
      if (company.bannerPublicId) {
        await deleteFromCloudinary(company.bannerPublicId);
      }
      const uploadResult = await uploadToCloudinary(bannerFile.buffer, 'jobsphere/banners');
      updateData.banner = uploadResult.url;
      updateData.bannerPublicId = uploadResult.public_id;
    } else if (
      removeBanner === 'true' ||
      removeBanner === true ||
      bodyBanner === '' ||
      bodyCoverImage === ''
    ) {
      if (company.bannerPublicId) {
        await deleteFromCloudinary(company.bannerPublicId);
      }
      updateData.banner = '';
      updateData.bannerPublicId = '';
    }

    company = await Company.findByIdAndUpdate(companyId, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: 'Company information updated successfully.',
      company,
    });
  } catch (error) {
    console.error('Error updating company:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update company information.',
      error: error.message,
    });
  }
};

/**
 * Delete company
 */
const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found.',
      });
    }

    // Verify ownership or admin privilege
    const userId = req.user._id || req.user.id;
    if (company.userId.toString() !== userId.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this company.',
      });
    }

    // Cleanup images from Cloudinary if present
    if (company.logoPublicId) {
      await deleteFromCloudinary(company.logoPublicId);
    }
    if (company.bannerPublicId) {
      await deleteFromCloudinary(company.bannerPublicId);
    }

    await Company.findByIdAndDelete(companyId);

    return res.status(200).json({
      success: true,
      message: 'Company deleted successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete company.',
      error: error.message,
    });
  }
};

export { registerCompany, getCompanies, getCompanyById, updateCompany, deleteCompany };
