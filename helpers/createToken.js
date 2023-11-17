
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

function createToken(username, isAdmin, hashedPassword) {
  const payload = { username, isAdmin, hashedPassword };
  return jwt.sign(payload, SECRET_KEY);
}

module.exports = createToken;
