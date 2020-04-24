const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const questionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        stype: String,
    },
    answerCount: {
        type: Number,
    },
    followerCount: {
        type: Number,
    },
    commentCount: {
        type: Number
    },
});

questionSchema.plugin(mongoosePaginate);

module.exports = Question = mongoose.model('question', questionSchema)