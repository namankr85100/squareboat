const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Recruiter Login',

  description: 'Login for recruiter account.',

  inputs: {
    email: {
      type: 'string',
      required: true,
      isEmail: true
    },
    password: {
      type: 'string',
      required: true
    }
  },

  exits: {
    success: {
      description: 'recruiter logged in successfully.'
    },
    badCombo: {
      description: 'The provided email and password do not match.',
      responseType: 'unauthorized',
      statusCode: 401
    },
    serverError: {
      description: 'Unexpected error occurred.',
      responseType: 'serverError'
    }
  },

  fn: async function (inputs, exits) {
    try {
      // Find the candidate by email
      let user = await User.findOne({ email: inputs.email.toLowerCase(), role: 'recruiter' });
      if (!user) {
        return exits.badCombo({ message: 'Invalid email or password.' });
      }

      // Check password
      const passwordsMatch = await bcrypt.compare(inputs.password, user.password);
      if (!passwordsMatch) {
        return exits.badCombo({ message: 'Invalid email or password.' });
      }

      // Create JWT token (Optional but recommended for session management)
      const secret = sails.config.custom.jwtSecret || 'your-super-secret-key'; // move to config
      const token = jwt.sign({ userId: user.id, role: user.role }, secret, { expiresIn: '7d' });


      // Send success with token
      return exits.success({
        message: 'Login successful!',
        token: token
      });

    } catch (err) {
      sails.log.error('Error in recruiter/login:', err);
      return exits.serverError({ message: 'Something went wrong.' });
    }
  }
};
