const Question = require('../models/question')

class QuestionController {
    constructor(){

    }

    static async listQuestions(name) {
        return await Question.paginate(name)
    }

    static async createQuestion(params) {
        const newQuestion = new Question(params)
        return await newQuestion.save()
    }

    static async updateQuestion(id, params) {
        return await Question.updateOne({ _id: id }, { $set: params }, { $runValidators: true })
    }

    static async getQuestion(id) {
        return await Question.findById(id)
    }

    static async getSimilarQuestions(id) {
        const question = await Question.findById(id)
        return await Question.find({ tags: question.tags }) 
    }
}

module.exports = QuestionController