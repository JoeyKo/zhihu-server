const express = require('express');
const router = express.Router();
const User = require("../models/User")

// regist
router.route('/regist')
  .post(async (req, res) => {
    try {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });
      const userCreated = await newUser.save()
      res.status(200).json({ user: userCreated })
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
        res.status(200).json({ code: 101, msg: 'user dosn\'t exist!' })
      }
      const isMatched = await userExist.comparePassword(req.body.password)
      if (isMatched) {
        res.status(200).json({ token: 'xx' })
      } else {
        res.status(200).json({ code: 101, msg: 'wrong passwrod!' })
      }
    } catch (err) {
      res.status(500).json({ msg: err })
    }
  })

module.exports = router;
