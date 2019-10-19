const express = require('express');
const router = express.Router();
const User = require("../models/User")

router.route('/user')
  .get((req, res) => {
    User.find()
      .then(items => res.status(200).json({ data: items }))
      .catch(err => res.status(404).json({ msg: 'No items found' }));
  })

  .post((req, res) => {
    const newItem = new User({
      name: req.body.name
    });
    newItem.save().then(item => console.log(item));
  });

module.exports = router;
