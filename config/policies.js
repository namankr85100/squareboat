/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  'candidate/apply-job': 'isLoggedIn',
  // 'candidate/my-applied-jobs': 'isLoggedIn',

  // Recruiter routes
  'recruiter/post-job': 'isLoggedIn',
  // 'recruiter/view-applicants': 'isLoggedIn',
  
  // Default to true (public) if needed
  '*': true

};
