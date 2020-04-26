const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    voteupCount: {
        type: Number
    },
    commentCount: {
        type: Number
    },
    commentPermission: {
        type: String,
    }
});

module.exports = mongoose.model('answer', answerSchema)