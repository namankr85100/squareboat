module.exports = {
  friendlyName: 'Post Job',

  description: 'Recruiter can post a new job.',

  inputs: {
    title: {
      type: 'string',
      required: true,
      description: 'Title of the job'
    },
    description: {
      type: 'string',
      required: true,
      description: 'Description of the job'
    }
  },

  exits: {
    success: {
      description: 'Job posted successfully.'
    },
    unauthorized: {
      description: 'Only recruiters are allowed to post jobs.',
      responseType: 'unauthorized'
    },
    serverError: {
      description: 'Unexpected error occurred.',
      responseType: 'serverError'
    }
  },

  fn: async function (inputs, exits) {
    try {
      // Check if user is authenticated and is a recruiter
      if (!this.req.user || this.req.user.role !== 'recruiter') {
        return exits.unauthorized({ message: 'Only recruiters can post jobs.' });
      }

      // Create the job
      const newJob = await Job.create({
        title: inputs.title,
        description: inputs.description,
        postedBy: this.req.user.userId
      }).fetch();

      return exits.success({
        message: 'Job posted successfully!',
        job: newJob
      });

    } catch (err) {
      sails.log.error('Error in recruiter/post-job:', err);
      return exits.serverError({ message: 'Something went wrong.' });
    }
  }
};
