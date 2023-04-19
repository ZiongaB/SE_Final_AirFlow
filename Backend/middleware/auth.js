const { check } = require('express-validator');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  
  const authHeader = req.get('Authorization');
  console.log(authHeader);
  if (!authHeader) {
    const error = new Error('Not authenticated!');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secretfortoken');
  } catch (err) {
    console.log(err);
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated!');
    error.statusCode = 401;
    throw error;
  }
  console.log("check2/2");
  req.isLoggedIn = true;
  req.userId = decodedToken.userId;
  req.email = decodedToken.email;
  next();
};
