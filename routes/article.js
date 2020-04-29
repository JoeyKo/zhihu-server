const express = require('express')
const router = express.Router();
const authenticate = require('../middlewares/Authenticate');
const ArticleCtrl = require('../controllers/ArticleController')
const { requestResponseHandler } = require('../handlers')
const { successResponseWithData, errorResponse } = requestResponseHandler

router.route('/')
  .get(async (req, res) => {
    const { page } = req.query
    const limit = 20
    const offset = (page ? page - 1 : 0) * limit
    const articles = await ArticleCtrl.listArticles({ limit, offset })
    successResponseWithData(res, null, { limit, offset, count: articles.count, articles: articles.rows })
  })

  .post(authenticate, async (req, res) => {
    try {
      const result = await ArticleCtrl.createArticle(req.body)
      successResponseWithData(res, null, result)
    } catch (err) {
      errorResponse(res, err.message)
    }
  })


router.route('/:id')
  .get(authenticate, async (req, res) => {
    try {
      const { id } = req.params
      const result = await ArticleCtrl.getArticle(id)
      successResponseWithData(res, null, result)
    } catch (err) {
      errorResponse(res, err.message)
    }
  })
  
  .put(authenticate, async (req, res) => {
    try {
      const { id } = req.params
      const result = await ArticleCtrl.updateArticle(id, req.body)
      successResponseWithData(res, null, result)
    } catch (err) {
      errorResponse(res, err.message)
    }
  })
module.exports = router