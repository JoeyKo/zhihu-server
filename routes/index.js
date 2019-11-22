const express = require('express')
const router = express.Router()

const user = require('./user')
const article = require('./article')
const store = require('./store')
const upload = require('./upload')
const authenticate = require('../middlewares/Authenticate');

const logger = require('../utils/logger')

router.route('/health-check')
  .get(authenticate, (req, res) => {
    logger.info('Hello!')
    res.status(200).json({ msg: 'health check!', serverMode: process.env.NODE_ENV })
  })

module.exports = [user, upload, article, store, router]