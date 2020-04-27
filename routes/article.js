const express = require('express')
const router = express.Router();
const authenticate = require('../middlewares/Authenticate');
const ArticleCtrl = require('../controllers/ArticleController')
const { requestResponseHandler } = require('../handlers')
const { successResponseWithData } = requestResponseHandler

router.route('/')
  .get(async (req, res) => {
    const { page } = req.query
    const limit = 20
    const offset = (page ? page - 1 : 0) * limit
    const articles = await ArticleCtrl.listArticles({ limit, offset })
    successResponseWithData(res, null, { limit, offset, count: articles.count, articles: articles.rows })
  })

  .post(authenticate, async (req, res) => {
    const result = await ArticleCtrl.createArticle(req.body)
    successResponseWithData(res, null, result)
  })

module.exports = router