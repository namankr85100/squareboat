// /**
//  * Job.js
//  *
//  * @description :: A model definition represents a job posted by a recruiter.
//  */
module.exports = {
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    postedBy: {
      model: 'user',   // Recruiter who posted the job
      required: true
    },
    applications: {
      collection: 'application',
      // via: 'job'
    }
  },
};
