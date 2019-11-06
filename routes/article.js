const express = require('express')
const router = express.Router();
const { sequelize, DataTypes } = require('../db/mysql')
const Article = require('../models/article')
const authenticate = require('../middlewares/Authenticate');

router.route('/article')
  .get(async (req, res) => {
    try {
      const { page } = req.query
      const limit = 20
      const offset = (page ? page - 1 : 0) * limit
      const articles = await Article(sequelize, DataTypes).findAndCountAll({
        limit,
        offset
      })
      res.status(200).json({ limit, offset, count: articles.count, data: articles.rows })
    } catch (err) {
      res.status(404).json({ msg: 'No articles found!' })
    }
  })

  .post(authenticate, async (req, res) => {
    try {
      const { title, description } = req.body
      const article = await Article(sequelize, DataTypes).create({ title, description })
      res.status(200).json({ data: article })
    } catch (err) {
      res.status(404).json({ msg: 'article create failed: ', err })
    }
  })

module.exports = router