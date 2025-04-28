

module.exports = {
  friendlyName: 'Ping',
  description : 'ping for other services to check if the monolith is live',
  example: [
    `curl -X GET "http://localhost:1337/ping`,
  ],

  inputs: {

  },

  exits: {
    serverError: {
      responseType: 'serverError',
      description: '[systems > fetchSystemDetails] Server Error!',
    },
  },

  fn: async function (inputs, exits) {
    try {
      return exits.success('pong');  
    } catch (error) {
      sails.log.error("Error in /ping!", error);
      return exits.serverError(error);
    }
    
  }
};
