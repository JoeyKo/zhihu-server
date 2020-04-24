const Question = require('../models/question')

class QuestionController {
    constructor(){

    }

    static async listQuestions(name, select) {
        return await Question.paginate(name || '', {
            select: select || { title: 1 },
        })
    }

    static async createQuestion(params) {
        const newQuestion = new Question(params)
        return await newQuestion.save()
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