const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const storeSchema = new Schema({
  location: {
    type: String,
    required: true
  },
})

storeSchema.plugin(mongoosePaginate);

module.exports = Store = mongoose.model('store', storeSchema)