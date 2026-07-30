import Job from '../models/job.model.js';
import Company from '../models/company.model.js';
import Application from '../models/application.model.js';

/**
 * Post a new Job listing (Recruiter / Admin)
 */
const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      experienceLevel,
      location,
      jobType,
      position,
      companyId,
      company,
    } = req.body;

    const targetCompanyId = companyId || company;

    if (
      !title ||
      !description ||
      !requirements ||
      salary === undefined ||
      !experienceLevel ||
      !location ||
      !position ||
      !targetCompanyId
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (title, description, requirements, salary, experienceLevel, location, position, companyId)',
      });
    }

    // Verify company exists
    const companyExists = await Company.findById(targetCompanyId);
    if (!companyExists) {
      return res.status(404).json({
        success: false,
        message: 'Associated company not found.',
      });
    }

    // Parse requirements
    let requirementsArray = [];
    if (Array.isArray(requirements)) {
      requirementsArray = requirements.map(r => String(r).trim()).filter(Boolean);
    } else if (typeof requirements === 'string') {
      requirementsArray = requirements.split(',').map(r => r.trim()).filter(Boolean);
    }

    const userId = req.user._id || req.user.id;

    const newJob = await Job.create({
      title: title.trim(),
      description: description.trim(),
      requirements: requirementsArray,
      salary: Number(salary),
      experienceLevel: String(experienceLevel).trim(),
      location: location.trim(),
      jobType: jobType || 'Full-time',
      position: Number(position),
      company: targetCompanyId,
      created_by: userId,
    });

    return res.status(201).json({
      success: true,
      message: 'Job posted successfully.',
      job: newJob,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to post job.',
      error: error.message,
    });
  }
};

/**
 * Get all Jobs
 */
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({})
      .populate({
        path: 'company',
        select: 'name logo location website description',
      })
      .populate({
        path: 'created_by',
        select: 'fullname email',
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve jobs.',
      error: error.message,
    });
  }
};

/**
 * Get Job by ID
 */
const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .populate({
        path: 'company',
        select: 'name logo location website description',
      })
      .populate({
        path: 'created_by',
        select: 'fullname email phoneNumber',
      })
      .populate({
        path: 'applications',
      });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job listing not found.',
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve job details.',
      error: error.message,
    });
  }
};

/**
 * Get jobs created by logged-in recruiter / admin
 */
const getAdminJobs = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    let query = { created_by: userId };

    if (req.user.role === 'admin') {
      query = {};
    }

    const jobs = await Job.find(query)
      .populate({
        path: 'company',
        select: 'name logo location website',
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve recruiter jobs.',
      error: error.message,
    });
  }
};

/**
 * Update Job listing by ID
 */
const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    let job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job listing not found.',
      });
    }

    // Verify creator ownership or admin privilege
    const userId = req.user._id || req.user.id;
    if (job.created_by.toString() !== userId.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this job listing.',
      });
    }

    const {
      title,
      description,
      requirements,
      salary,
      experienceLevel,
      location,
      jobType,
      position,
      companyId,
    } = req.body;

    const updateData = {};
    if (title) updateData.title = title.trim();
    if (description) updateData.description = description.trim();
    if (salary !== undefined) updateData.salary = Number(salary);
    if (experienceLevel) updateData.experienceLevel = String(experienceLevel).trim();
    if (location) updateData.location = location.trim();
    if (jobType) updateData.jobType = jobType;
    if (position !== undefined) updateData.position = Number(position);
    if (companyId) updateData.company = companyId;

    if (requirements) {
      if (Array.isArray(requirements)) {
        updateData.requirements = requirements.map(r => String(r).trim()).filter(Boolean);
      } else if (typeof requirements === 'string') {
        updateData.requirements = requirements.split(',').map(r => r.trim()).filter(Boolean);
      }
    }

    job = await Job.findByIdAndUpdate(jobId, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: 'Job listing updated successfully.',
      job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update job listing.',
      error: error.message,
    });
  }
};

/**
 * Delete Job listing by ID
 */
const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job listing not found.',
      });
    }

    // Verify creator ownership or admin privilege
    const userId = req.user._id || req.user.id;
    if (job.created_by.toString() !== userId.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this job listing.',
      });
    }

    await Job.findByIdAndDelete(jobId);

    return res.status(200).json({
      success: true,
      message: 'Job listing deleted successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete job listing.',
      error: error.message,
    });
  }
};

/**
 * Get recruiter dashboard statistics & summary analytics
 */
const getRecruiterStats = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    // Get jobs created by recruiter
    const jobs = await Job.find({ created_by: userId })
      .populate('company', 'name logo')
      .sort({ createdAt: -1 });

    const totalJobs = jobs.length;
    const activeJobs = jobs.filter((j) => (j.position || 0) > 0).length;
    const closedJobs = totalJobs - activeJobs;

    const jobIds = jobs.map((j) => j._id);

    // Get applications for recruiter's jobs
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate({
        path: 'applicant',
        select: 'fullname email phoneNumber profile',
      })
      .populate({
        path: 'job',
        select: 'title company position location salary jobType',
        populate: { path: 'company', select: 'name logo' },
      })
      .sort({ createdAt: -1 });

    const totalApplicants = applications.length;

    let pending = 0;
    let reviewed = 0;
    let interview = 0;
    let selected = 0;
    let rejected = 0;

    applications.forEach((app) => {
      const st = (app.status || 'pending').toLowerCase();
      if (st === 'pending') pending++;
      else if (st === 'reviewed') reviewed++;
      else if (st === 'interview') interview++;
      else if (st === 'accepted' || st === 'selected') selected++;
      else if (st === 'rejected') rejected++;
    });

    const recentJobs = jobs.slice(0, 5);
    const recentApplications = applications.slice(0, 5);

    return res.status(200).json({
      success: true,
      stats: {
        totalJobs,
        activeJobs,
        closedJobs,
        totalApplicants,
        pending,
        reviewed,
        interview,
        selected,
        rejected,
      },
      recentJobs,
      recentApplications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve recruiter stats.',
      error: error.message,
    });
  }
};

export { postJob, getAllJobs, getJobById, getAdminJobs, updateJob, deleteJob, getRecruiterStats };
