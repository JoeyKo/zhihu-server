const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  coverImage: {
    type: Schema.Types.ObjectId,
    ref: 'File'
  },
  location: {
    type: String,
    required: true
  },
})

storeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Store', storeSchema)