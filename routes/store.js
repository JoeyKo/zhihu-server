const express = require('express')
const router = express.Router();
const Store = require('../models/store')

router.route('/store')
  .get(async (req, res) => {
    try {
      const stores = await Store.paginate()
      res.status(200).json({ data: stores })
    } catch (err) {
      res.status(404).json({ msg: 'No items found' })
    }
  })

  .post(async (req, res) => {
    try {
      const newItem = new Store({
        location: req.body.location
      })
      const storeCreated = await newItem.save()
      res.status(200).json({ data: storeCreated })
    } catch (err) {
      res.status(500).json({ msg: 'created failed!' })
    }
  })

module.exports = router