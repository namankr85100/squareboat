/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

/* eslint-disable key-spacing */

module.exports.routes = {
  'POST  /api/v1/ping': { action: 'init/ping' },

  'POST /api/v1/candidate/signup': { action: 'candidate/signup' }, // D
  'POST /api/v1/candidate/login': { action: 'candidate/login' },//D
  'GET /api/v1/candidate/jobs': { action: 'candidate/list-jobs' }, // D
  'POST /api/v1/candidate/apply/jobId/:jobId': { action: 'candidate/apply-job' }, // D
  'GET /api/v1/candidate/applied-jobs': { action: 'candidate/list-applied-jobs' },
  'POST /api/v1/candidate/logout': { action: 'candidate/logout' },

  'POST /api/v1/recruiter/signup': { action: 'recruiter/signup' }, //D
  'POST /api/v1/recruiter/login': { action: 'recruiter/login' },// D
  'POST /api/v1/recruiter/job': { action: 'recruiter/post-job' },// D
  'GET /api/v1/recruiter/applicants/job/:jobId': { action: 'recruiter/list-applicants' },
  'POST /api/v1/recruiter/logout': { action: 'recruiter/logout' },

}
