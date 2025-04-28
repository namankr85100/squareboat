module.exports = {
  friendlyName: 'View Applicants',

  description: 'View the list of applicants for a specific job posted by the recruiter.',

  inputs: {
    jobId: {
      type: 'number',
      required: true,
      description: 'The ID of the job to fetch applicants for.'
    }
  },

  exits: {
    success: {
      description: 'Successfully fetched the list of applicants.',
      responseType: 'ok'
    },
    notFound: {
      description: 'No applicants found for the specified job.',
      responseType: 'notFound'
    },
    serverError: {
      description: 'Unexpected error occurred.',
      responseType: 'serverError'
    },
    unauthorized: {
      description: 'Only recruiters are allowed to view applicants.',
      statusCode: 403,
    }
  },

  fn: async function (inputs, exits) {
    try {
      // Ensure the user is logged in and is a recruiter
      if (!this.req.user || this.req.user.role !== 'recruiter') {
        return exits.unauthorized({ message: 'You must be a recruiter to view applicants.' });
      }

      // Check if the job exists and belongs to the recruiter
      const job = await Job.findOne({ id: inputs.jobId, postedBy: this.req.user.userId });

      if (!job) {
        return exits.notFound({ message: 'Job not found or you are not authorized to view applicants for this job.' });
      }

      // Fetch the list of applicants for the job
      const applicants = await Application.find({
        where: { job: inputs.jobId },
      });

      // If no applicants, return a notFound message
      if (applicants.length === 0) {
        return exits.notFound({ message: 'No applicants found for this job.' });
      }

      // Format the result to include applicant details (e.g., name, email)
      const applicantDetails = applicants.map(application => {
        return {
          candidateId: application.candidate,
          jobId: application.job,
        };
      });

      return exits.success({
        message: 'Applicants fetched successfully!',
        applicants: applicantDetails
      });

    } catch (err) {
      sails.log.error('Error in recruiter/view-applicants:', err);
      return exits.serverError({ message: 'Something went wrong while fetching applicants.' });
    }
  }
};
