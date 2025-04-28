// /**
//  * Application.js
//  *
//  * @description :: A model definition represents a job application made by a candidate.
//  */
module.exports = {
  attributes: {
    job: {
      type: 'string',
      required: true
    },
    candidate: {
      type: 'string',
      required: true
    },
    appliedAt: {
      type: 'ref',
      // columnType: 'datetime',
      // autoCreatedAt: true
    }
  },
};
