const mongoosePaginate = require('mongoose-paginate-v2');
const cloudinary = require('cloudinary').v2;

mongoosePaginate.paginate.options = { 
  lean: true,
  limit: 20
};

cloudinary.config({ 
  cloud_name: 'di6jhesvx',
  api_key: '246945573141258',
  api_secret: 'gz6tA87IgAyKDUB4mxjwKKQsaiY'
});

const pagination = {
  limit: 20
}

module.exports = {
  pagination
}