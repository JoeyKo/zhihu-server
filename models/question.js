const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const questionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    answerCount: {
        type: Number,
        default: 0,
    },
    followerCount: {
        type: Number,
        default: 0,
    },
    commentCount: {
        type: Number,
        default: 0,
    },
    tags: {
        type: Array,
    }
});

questionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('question', questionSchema)