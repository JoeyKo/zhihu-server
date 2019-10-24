const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/User")

const config = require('../config')

// regist
router.route('/regist')
  .post(async (req, res) => {
    try {
      const userExist = await User.findOne({ email: req.body.email })
      if (userExist) {
        res.status(200).json({ success: false, msg: `user ${req.body.email} already exists!` })
        return
      }
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });
      const userCreated = await newUser.save()
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
        res.status(200).json({ success: false, msg: 'user dosn\'t exist!' })
        return
      }
      const isMatched = await userExist.comparePassword(req.body.password)
      if (isMatched) {
        res.status(200).json({ msg: 'login successfully!', token: jwt.sign({
          id: userExist.id,
          exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),}, config.JWTSECRET)
        });
      } else {
        res.status(200).json({ success: false, msg: 'wrong passwrod!' })
      }
    } catch (err) {
      res.status(500).json({ msg: err })
    }
  })

module.exports = router;
