const mongoosePaginate = require('mongoose-paginate-v2');

mongoosePaginate.paginate.options = { 
  lean: true,
  limit: 20
};

const pagination = {
  limit: 20
}

module.exports = {
  pagination
}