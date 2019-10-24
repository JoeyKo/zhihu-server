const express = require('express')
const router = express.Router()

const user = require('./user')
const store = require('./store')
const { Auth } = require('../helpers');

router.route('/')
  .get(Auth, (req, res) => {
    console.log('health check!', process.env.NODE_ENV)
    res.status(200).json({ msg: 'health check!' })
  })


module.exports = [user, store, router]