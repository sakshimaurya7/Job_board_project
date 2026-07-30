import Company from '../models/company.model.js';
import User from '../models/user.model.js';

/**
 * Register/Create a new Company
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
    if (Array.isArray(benefits)) {
      parsedBenefits = benefits.map((b) => String(b).trim()).filter(Boolean);
    } else if (typeof benefits === 'string') {
      parsedBenefits = benefits.split(',').map((b) => b.trim()).filter(Boolean);
    }

    const company = await Company.create({
      name: nameToUse,
      description: description || '',
      website: website || '',
      location: location || '',
      logo: logo || '',
      banner: banner || '',
      tagline: tagline || '',
      industry: industry || '',
      phone: phone || '',
      companySize: companySize || '',
      founded: founded || '',
      headquarters: headquarters || '',
      benefits: parsedBenefits,
      socialLinks: socialLinks || {},
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
 * Update company information
 */
const updateCompany = async (req, res) => {
  try {
    const {
      name,
      description,
      website,
      location,
      logo,
      banner,
      tagline,
      industry,
      phone,
      companySize,
      founded,
      headquarters,
      benefits,
      socialLinks,
    } = req.body;
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

    const updateData = {};
    if (name) updateData.name = name.trim();
    if (description !== undefined) updateData.description = description;
    if (website !== undefined) updateData.website = website;
    if (location !== undefined) updateData.location = location;
    if (logo !== undefined) updateData.logo = logo;
    if (banner !== undefined) updateData.banner = banner;
    if (tagline !== undefined) updateData.tagline = tagline;
    if (industry !== undefined) updateData.industry = industry;
    if (phone !== undefined) updateData.phone = phone;
    if (companySize !== undefined) updateData.companySize = companySize;
    if (founded !== undefined) updateData.founded = founded;
    if (headquarters !== undefined) updateData.headquarters = headquarters;

    if (benefits !== undefined) {
      if (Array.isArray(benefits)) {
        updateData.benefits = benefits.map((b) => String(b).trim()).filter(Boolean);
      } else if (typeof benefits === 'string') {
        updateData.benefits = benefits.split(',').map((b) => b.trim()).filter(Boolean);
      }
    }

    if (socialLinks !== undefined) {
      updateData.socialLinks = {
        ...company.socialLinks,
        ...socialLinks,
      };
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

export { registerCompany, getCompanies, getCompanyById, updateCompany, deleteCompany }
