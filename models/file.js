const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['image', 'video', 'audio'],
    required: true,
  },
  format: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  publicId: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
},{ timestamps: true });

module.exports = mongoose.model('File', fileSchema);