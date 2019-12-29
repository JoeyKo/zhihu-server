const express = require('express')
const router = express.Router();
const authenticate = require('../middlewares/Authenticate');
const ArticleCtrl = require('../controllers/ArticleController')
const { requestResponseHandler } = require('../handlers')
const { successResponseWithData } = requestResponseHandler

router.route('/article')
  .get(async (req, res) => {
    const { page } = req.query
    const limit = 20
    const offset = (page ? page - 1 : 0) * limit
    const articles = await ArticleCtrl.listArticles({ limit, offset })
    successResponseWithData(res, null, { limit, offset, count: articles.count, articles: articles.rows })
  })

  .post(authenticate, async (req, res) => {
    const { title, description } = req.body
    successResponseWithData(res, null, { title, description })
  })

module.exports = router