const express = require('express')
const router = express.Router();
const { sequelize, DataTypes } = require('../db/mysql')
const Article = require('../models/article')
const authenticate = require('../middlewares/Authenticate');

router.route('/article')
  .get((req, res) => {
    Article(sequelize, DataTypes).findAll()
      .then(articles => res.status(200).json({ data: articles }))
      .catch(err => res.status(404).json({ msg: 'No articles found!' }))
  })

  .post(authenticate, (req, res) => {
    const { title, description } = req.body
    Article(sequelize, DataTypes).create({ title, description })
      .then(article => res.status(200).json({ data: article }))
      .catch(err => res.status(404).json({ msg: 'article create failed: ', err }))
  })

module.exports = router