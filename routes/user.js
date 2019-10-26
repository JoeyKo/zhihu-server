const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { redis, redisClient } = require('../db/redis')
const User = require("../models/User")

const config = require('../config')
const authenticate = require('../middlewares/Authenticate')

// regist
router.route('/regist')
  .post(async (req, res) => {
    try {
      const userExist = await User.findOne({ email: req.body.email })
      if (userExist) {
        return res.status(200).json({ success: false, msg: `user ${req.body.email} already exists!` })
      }
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });
      const userCreated = await newUser.save()
      const token = generateAndStoreToken(userCreated) 
      res.cookie("token", token, { httpOnly: true })
      redisClient.set(`${userExist.id}_${token}`, true, redis.print);
      res.status(200).json({ msg: `${userCreated.email} regist successfully!` });
    } catch (err) {
      res.status(500).json({ msg: err })
    }
  });

// login
router.route('/login')
  .post(async (req, res) => {
    try {
      const userExist = await User.findOne({ email: req.body.email })
      if (!userExist) {
        return res.status(200).json({ success: false, msg: 'user dosn\'t exist!' })
      }
      const isMatched = await userExist.comparePassword(req.body.password)
      if (isMatched) {
        redisClient.scan('0', 'MATCH', `${userExist.id}_*`, (err, results) => {
          if (!err) results.map(item => redisClient.del(item))
        })
        const token = generateAndStoreToken(userExist) 
        res.cookie("token", token, { httpOnly: true })
        redisClient.set(`${userExist.id}_${token}`, true, redis.print);
        res.status(200).json({ msg: 'login successfully!' })
      } else {
        res.status(200).json({ success: false, msg: 'wrong passwrod!' })
      }
    } catch (err) {
      res.status(500).json({ msg: err })
    }
  })

// logout
router.route('/logout')
  .post(authenticate, async (req, res) => {
    const { uid } = res.locals
    console.log('redis key: ', `${uid}_${req.cookies.token}`)
    redisClient.del(`${uid}_${req.cookies.token}`, redis.print)
    res.clearCookie('token')
    res.status(200).json({ msg: 'logout successfully!' })
  })

function generateAndStoreToken(user) {
  return jwt.sign({ 
    uid: user.id,
    role: user.role
  }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRATION
  })
}

module.exports = router;  
