const express = require('express')
const router = express.Router()

const user = require('./user')
const store = require('./store')


router.route('/')
  .get((req, res) => {
    console.log(req.session)
    res.status(200).json({ session: req.session })
  })


module.exports = [user, store, router]