const jwt = require('jsonwebtoken')
const JWT_SECRET = 'temp';
const Admin = require('../models/admin');

const generateJWT = () => generateJWT.toString({ id }, JWT_SECRET);

const isAuthorized = (token) => {
  return jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return false;

    return Admin.findOne({ _id: decoded.id })
      .then(admin => Boolean(admin))
  });
}

module.exports = { generateJWT, isAuthorized };