const express = require('express')
const router = express.Router();
const Store = require('../models/store')
const { requestResponseHandler } = require('../handlers')
const { successResponseWithData } = requestResponseHandler

router.route('/store')
  .get(async (req, res) => {
    const stores = await Store.paginate('', {
      select: { location: 1, user: 1 },
      populate: { path: 'user' }
    })
    successResponseWithData(res, null, { data: stores })
  })

  .post(async (req, res) => {
    const { location, user } = req.body
    const newItem = new Store({
      location,
      user
    })
    const storeCreated = await newItem.save()
    successResponseWithData(res, null, { data: storeCreated })
  })

module.exports = router