module.exports = {
  friendlyName: 'List Jobs',

  description: 'Fetch a list of all available jobs for candidates.',

  inputs: {},

  exits: {
    success: {
      description: 'Jobs listed successfully.'
    },
    serverError: {
      description: 'Unexpected error occurred.',
      responseType: 'serverError'
    }
  },

  fn: async function (inputs, exits) {
    try {
      // Fetch all available jobs (job title and description)
      const jobs = await Job.find({
        select: ['id', 'title', 'description'],  // assuming we have a flag isActive to check job availability
      });

      return exits.success({
        message: 'Jobs fetched successfully!',
        jobs: jobs
      });

    } catch (err) {
      sails.log.error('Error in candidate/list-jobs:', err);
      return exits.serverError({ message: 'Something went wrong while fetching jobs.' });
    }
  }
};
