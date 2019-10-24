const jwt = require('jsonwebtoken');
const config = require('../config')

const Auth = function (req, res, next) {
  // check header or url parameters or post parameters for token
  const token = req.headers.authorization;
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.JWTSECRET, function (err, decoded) {
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Sign in to continue.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(401).send({
      success: false,
      message: 'Sign in to continue.'
    });
  }
}

module.exports = Auth;