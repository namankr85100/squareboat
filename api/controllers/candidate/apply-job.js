const nodemailer = require('nodemailer');
module.exports = {
  friendlyName: 'Apply for Job',

  description: 'Apply for a job posted by a recruiter.',

  inputs: {
    jobId: {
      type: 'number',
      required: true,
      description: 'The ID of the job to apply for.'
    }
  },

  exits: {
    success: {
      description: 'Job applied successfully.'
    },
    notFound: {
      description: 'The job was not found.',
      responseType: 'notFound'
    },
    alreadyApplied: {
      description: 'Candidate has already applied for this job.',
      statusCode: 409
    },
    serverError: {
      description: 'Unexpected error occurred.',
      responseType: 'serverError'
    }
  },

  fn: async function (inputs, exits) {
    try {
      // Check if the user is logged in and is a candidate
      if (!this.req.user || this.req.user.role !== 'candidate') {
        return exits.unauthorized({ message: 'You must be a candidate to apply for jobs.' });
      }

      // Check if the job exists
      const job = await Job.findOne({ id: inputs.jobId });
      if (!job) {
        return exits.notFound({ message: 'Job not found.' });
      }

      // Check if the candidate has already applied for the job
      const existingApplication = await Application.findOne({
        job: inputs.jobId,
        candidate: this.req.user.userId
      });
      if (existingApplication) {
        return exits.alreadyApplied({ message: 'You have already applied for this job.' });
      }

      // Create a new application
      const application = await Application.create({
        job: inputs.jobId,
        candidate: this.req.user.userId
      }).fetch();

      // Send email to recruiter (you would need email service configured)
      const recruiter = await User.findOne({ id: job.postedBy });

      // Create a transporter object using your email service (e.g., Gmail, SendGrid, etc.)
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'rodrigo.mcglynn19@ethereal.email', // TODO: Add in process.env
            pass: 'XdyfcsyqSsBae56qV3'
        }
    }); // Test working email
  
      // Set email options
      const mailOptions = {
        from: 'namankr851@gmail.com',
        to: recruiter.email,
        subject: 'New Job Application',
        text: `Candidate ${this.req.user.userId} has applied for the job: ${job.title}.`
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);


      return exits.success({
        message: 'Job application submitted successfully!',
        application: application
      });

    } catch (err) {
      sails.log.error('Error in candidate/apply-job:', err);
      return exits.serverError({ message: 'Something went wrong while applying for the job.' });
    }
  }
};
