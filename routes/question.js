const express = require('express')
const router = express.Router()
const QuestionCtrl = require('../controllers/QuestionController')
const { requestResponseHandler } = require('../handlers')
const { successResponseWithData, errorResponse } = requestResponseHandler

router.route('/')
	.get(async (req, res) => {
		try {
      const result = await QuestionCtrl.listQuestions()
      successResponseWithData(res, null, { 
        data: result.docs, 
        pageSize: result.limit, 
        current: result.page, 
        count: result.totalDocs, 
      })
    } catch (err) {
      errorResponse(res, err.message)
    }
	})

	.post(async (req, res) => {
		const result = await QuestionCtrl.createQuestion(req.body)
		successResponseWithData(res, null, result)
	})

router.route('/:id')
	.get(async (req, res) => {
		const { id } = req.params
		const results = await QuestionCtrl.getQuestion(id)
		successResponseWithData(res, null, results)
	})

	.put(async (req, res) => {
		const { id } = req.params
		const result = await QuestionCtrl.updateQuestion(id, req.body)
		successResponseWithData(res, null, result)
	})

router.route('/:id/similar-questions')
	.get(async (req, res) => {
		const { id } = req.params
		const results = await QuestionCtrl.getSimilarQuestions(id)
		successResponseWithData(res, null, results)
	})

module.exports = router