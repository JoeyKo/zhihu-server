const express = require('express')
const router = express.Router()
const QuestionCtrl = require('../controllers/QuestionController')
const { requestResponseHandler } = require('../handlers')
const { successResponseWithData } = requestResponseHandler

router.route('/')
	.get(async (req, res) => {
		const results = await QuestionCtrl.listQuestions()
		successResponseWithData(res, null, { questions: results })
	})

	.post(async (req, res) => {
		const { title } = req.body;
		const result = await QuestionCtrl.createQuestion({ title })
		successResponseWithData(res, null, { question: result })
	})

router.route('/:id')
	.get(async (req, res) => {
		const { id } = req.params
		const results = await QuestionCtrl.getQuestion(id)
		successResponseWithData(res, null, { questions: results })
	})

router.route('/:id/similar-questions')
	.get(async (req, res) => {
		const { id } = req.params
		const results = await QuestionCtrl.getSimilarQuestions(id)
		successResponseWithData(res, null, { questions: results })
	})

module.exports = router