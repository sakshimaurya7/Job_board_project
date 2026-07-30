import Application from '../models/application.model.js';
import Job from '../models/job.model.js';

/**
 * Job seeker applies for a Job
 */
export const applyJob = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: 'Job ID is required.',
      });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job listing not found.',
      });
    }

    // Check if user has already applied for this job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job.',
      });
    }

    // Create new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
      status: 'pending',
    });

    // Add application ID to Job applications array
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      success: true,
      message: 'Job application submitted successfully.',
      application: newApplication,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to submit application.',
      error: error.message,
    });
  }
};

/**
 * Get all applications submitted by logged-in jobseeker
 */
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'job',
        populate: {
          path: 'company',
          select: 'name logo location website',
        },
      });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve applied jobs.',
      error: error.message,
    });
  }
};

/**
 * Get applicants for a specific job OR all jobs created by recruiter
 */
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user._id || req.user.id;

    if (jobId && jobId !== 'all') {
      const job = await Job.findById(jobId).populate({
        path: 'applications',
        options: { sort: { createdAt: -1 } },
        populate: [
          {
            path: 'applicant',
            select: 'fullname email phoneNumber profile',
          },
          {
            path: 'job',
            populate: {
              path: 'company',
              select: 'name logo location',
            },
          },
        ],
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
        applications: job.applications || [],
      });
    }

    // If jobId is 'all' or not specified, fetch all jobs by this recruiter and aggregate their applications
    const recruiterJobs = await Job.find({ created_by: userId }).select('_id title location jobType company');
    const jobIds = recruiterJobs.map((j) => j._id);

    const applications = await Application.find({ job: { $in: jobIds } })
      .sort({ createdAt: -1 })
      .populate({
        path: 'applicant',
        select: 'fullname email phoneNumber profile',
      })
      .populate({
        path: 'job',
        populate: {
          path: 'company',
          select: 'name logo location',
        },
      });

    return res.status(200).json({
      success: true,
      jobs: recruiterJobs,
      applications,
      count: applications.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve applicants.',
      error: error.message,
    });
  }
};

/**
 * Update application status (pending, reviewed, interview, accepted, selected, rejected) (Recruiter / Admin)
 */
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required.',
      });
    }

    const validStatuses = ['pending', 'reviewed', 'interview', 'accepted', 'selected', 'rejected'];
    const normalizedStatus = status.toLowerCase();

    if (!validStatuses.includes(normalizedStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status '${status}'. Allowed values: ${validStatuses.join(', ')}`,
      });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found.',
      });
    }

    application.status = normalizedStatus;
    await application.save();

    return res.status(200).json({
      success: true,
      message: `Application status updated to '${normalizedStatus}'.`,
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update application status.',
      error: error.message,
    });
  }
};

/**
 * Job seeker withdraws/deletes a pending application
 */
export const withdrawApplication = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const applicationId = req.params.id;

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found.',
      });
    }

    // Ensure only the applicant can withdraw their own application
    if (application.applicant.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to withdraw this application.',
      });
    }

    // Remove application ID from Job's applications array
    await Job.findByIdAndUpdate(application.job, {
      $pull: { applications: applicationId },
    });

    // Delete application document
    await Application.findByIdAndDelete(applicationId);

    return res.status(200).json({
      success: true,
      message: 'Application withdrawn successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to withdraw application.',
      error: error.message,
    });
  }
};

