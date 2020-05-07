const express = require('express')
const router = express.Router();
const Joi = require('@hapi/joi');
const authenticate = require('../middlewares/Authenticate');
const ArticleCtrl = require('../controllers/ArticleController')
const { requestResponseHandler } = require('../handlers')
const { logger } = require('../helpers')
const { successResponseWithData, successResponse, errorResponse } = requestResponseHandler

router.route('/')
  .get(async (req, res) => {
    try {
      const value = await schema.validateAsync(req.query);
      const { current, pageSize, sorter } = value
     
      // paginate
      const limit = pageSize || 20
      const offset = (current ? current - 1 : 0) * limit

      // order
      const sortArr = sorter ? sorter.split('_') : []
      const order = sortArr[0] || 'updatedAt'
      const orderType = sortArr[1] || 'DESC'

      const articles = await ArticleCtrl.listArticles({ limit, offset, order: [[order, orderType]] })
      successResponseWithData(res, null, { pageSize: limit, current: current || 1, count: articles.count, data: articles.rows })
    } catch (err) {
      logger.error(`GET /api/article ${err.message}`)
      errorResponse(res, err.message)
    }
  })

  .post(authenticate, async (req, res) => {
    try {
      await ArticleCtrl.createArticle(req.body)
      successResponse(res, null)
    } catch (err) {
      logger.error(`POST /api/article ${err.message}`)
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
      await ArticleCtrl.updateArticle(id, req.body)
      successResponse(res, null)
    } catch (err) {
      errorResponse(res, err.message)
    }
  })

  .delete(authenticate, async (req, res) => {
    try {
      const { id } = req.params
      await ArticleCtrl.delArticle(id, req.body)
      successResponse(res, null)
    } catch (err) {
      errorResponse(res, err.message)
    }
  })

module.exports = router

const schema = Joi.object({
  pageSize: Joi.number().optional().empty(''),
  current: Joi.number().optional().empty(''),
  sorter: Joi.string().optional().empty(''),
})
