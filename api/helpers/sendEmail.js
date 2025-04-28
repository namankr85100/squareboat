// api/helpers/sendEmail.js
module.exports = {
  friendlyName: 'Send Email',

  description: 'Send an email with the provided options.',

  inputs: {
    to: {
      type: 'string',
      required: true
    },
    subject: {
      type: 'string',
      required: true
    },
    text: {
      type: 'string',
      required: true
    }
  },

  exits: {},

  fn: async function (inputs) {
    const nodemailer = require('nodemailer');

    // Create a transporter object using your email service (e.g., Gmail, SendGrid, etc.)
    const transporter = nnodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'rodrigo.mcglynn19@ethereal.email',
          pass: 'XdyfcsyqSsBae56qV3'
      }
  });

    // Set email options
    const mailOptions = {
      from: 'namankr851@gmail.com',
      to: inputs.to,
      subject: inputs.subject,
      text: inputs.text
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  }
};
