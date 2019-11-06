const express = require('express')
const router = express.Router();
const Store = require('../models/store')

router.route('/store')
  .get(async (req, res) => {
    try {
      const stores = await Store.paginate('', {
        select: { location: 1, user: 1 },
        populate: { path: 'user' }
      })
      res.status(200).json({ data: stores })
    } catch (err) {
      res.status(404).json({ msg: 'No items found' })
    }
  })

  .post(async (req, res) => {
    try {
      const { location, user } = req.body
      const newItem = new Store({
        location,
        user
      })
      const storeCreated = await newItem.save()
      res.status(200).json({ data: storeCreated })
    } catch (err) {
      res.status(500).json({ msg: 'created failed!' })
    }
  })

module.exports = router