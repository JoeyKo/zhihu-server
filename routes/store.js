const express = require('express')
const router = express.Router();
const Store = require('../models/Store')

router.route('/store')
  .get((req, res) => {
    Store.find()
      .then(items => res.status(200).json({ data: items }))
      .catch(err => res.status(404).json({ msg: 'No items found' }))
  })

  .post((req, res) => {
    const newItem = new Store({
      location: req.body.location
    })

    newItem.save().then(item => console.log(item))
  })

module.exports = router