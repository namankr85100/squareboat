/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {

  attributes: {

    role: {
      type: 'string',
      isIn: ['candidate', 'recruiter'],
      required: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },
    password: {
      type: 'string',
      required: true
    },
    // Relations
    jobs: {
      collection: 'job',
      // via: 'postedBy'
    },
    applications: {
      collection: 'application',
      // via: 'candidate'
    }

  },


};
