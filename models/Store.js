const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  location: {
    type: String,
    required: true
  },
})

module.exports = Store = mongoose.model('store', storeSchema)