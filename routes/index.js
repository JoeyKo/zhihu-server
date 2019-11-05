const express = require('express')
const router = express.Router()

const user = require('./user')
const article = require('./article')
const store = require('./store')
const upload = require('./upload')
const authenticate = require('../middlewares/Authenticate');

router.route('/')
  .get(authenticate, (req, res) => {
    console.log('health check!', process.env.NODE_ENV)
    res.status(200).json({ msg: 'health check!' })
  })

module.exports = [user, upload, article, store, router]