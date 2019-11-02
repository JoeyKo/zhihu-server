const jwt = require('jsonwebtoken');

const JWTAuth = function (req, res, next) {
  // check header or url parameters or post parameters for token
  const token = req.cookies.token;
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.status(401).json({
          success: false,
          msg: 'Sign in to continue.'
        });
      }
      // if everything is good, save to request for use in other routes
      console.log('decoded token: ', decoded)
      res.locals.uid = decoded.uid
      next();
    });
  } else {
    // if there is no token
    // return an error
    res.status(401).json({
      success: false,
      msg: 'Sign in to continue.'
    });
  }
}

module.exports = JWTAuth;