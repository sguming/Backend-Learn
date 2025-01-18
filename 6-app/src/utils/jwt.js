const jwt = require('jsonwebtoken');
const config = require('./config');

const generateToken = (payload) => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: 1 });
};

const validateToken = (token) => {
  try {
    const payload = jwt.verify(token, config.JWT_SECRET);
    return payload;
  } catch (e) {
    return null;
  }
};

module.exports = {
  generateToken,
  validateToken,
};
