const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  location: {
    type: String,
    required: true
  },
})

module.exports = Store = mongoose.model('store', StoreSchema)