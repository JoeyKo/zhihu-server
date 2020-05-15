const { redisClient } = require('../db/redis')

const JWTAuth = async function (req, res, next) {
  try {
    const token = req.cookies.token
    const { uid } = res.locals
    const isTokenValid = await redisClient.get(`${uid}_${token}`)
    if (!isTokenValid) {
      return res.status(401).json({
        status: 0,
        message: 'Sign in to continue.',
      });
    }
    next()
  } catch (err) {
    res.status(401).json({
      status: 0,
      message: 'Sign in to continue.',
    });
  }
} 

module.exports = JWTAuth;