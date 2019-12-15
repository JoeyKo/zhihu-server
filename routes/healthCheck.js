const express = require('express')
const router = express.Router()

const authenticate = require('../middlewares/Authenticate');
const { logger } = require('../helpers')

router.route('/health-check')
  .get(authenticate, (req, res) => {
    logger.info('Hello!')
    res.status(200).json({ msg: 'health check!', serverMode: process.env.NODE_ENV })
  })

module.exports = router