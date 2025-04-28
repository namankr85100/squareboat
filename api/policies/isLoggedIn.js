const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {
  try {
    // Get Authorization header
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.unauthorized({ message: 'Authorization header missing or malformed.' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const secret = sails.config.custom.jwtSecret || 'your-super-secret-key'; // should match your helper
    const decoded = jwt.verify(token, secret);

    // Attach user info to request
    req.user = {
      userId: decoded.userId,
      role: decoded.role
    };

    return proceed();

  } catch (err) {
    sails.log.error('JWT Verification Failed:', err);
    return res.unauthorized({ message: 'Invalid or expired token.' });
  }
};
