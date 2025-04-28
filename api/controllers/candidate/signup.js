const bcrypt = require('bcryptjs');

module.exports = {
  friendlyName: 'Candidate Signup',

  description: 'Signup for new candidate account.',

  inputs: {
    email: {
      type: 'string',
      required: true,
      isEmail: true
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6
    }
  },

  exits: {
    success: {
      description: 'Candidate signed up successfully.'
    },
    emailAlreadyInUse: {
      description: 'Email address already exists.',
      statusCode: 409
    },
    serverError: {
      description: 'Unexpected error occurred.',
      responseType: 'serverError'
    }
  },

  fn: async function (inputs, exits) {
    try {
      // Check if email already exists
      let existingUser = await User.findOne({ email: inputs.email });
      if (existingUser) {
        return exits.emailAlreadyInUse({ message: 'Email already exists.' });
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(inputs.password, saltRounds);
      // Create user
      let newUser = await User.create({
        email: inputs.email.toLowerCase(),
        password: hashedPassword,
        role: 'candidate'
      }).fetch();

      // (Optional) create JWT Token here if you want immediate login

      return exits.success({
        message: 'Candidate account created successfully!',
        userId: newUser.id
      });

    } catch (err) {
      sails.log.error('Error in candidate/signup:', err);
      return exits.serverError({ message: 'Something went wrong.' });
    }
  }
};
