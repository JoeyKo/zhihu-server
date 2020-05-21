const express = require('express')
const router = express.Router()
const UploadCtrl = require('../controllers/UploadController')
const { requestResponseHandler } = require('../handlers')
const { successResponseWithData, errorResponse } = requestResponseHandler

router.route('/upload')
  .post(async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return errorResponse(res, 'No files were uploaded');
    } else {
      const { type } = req.query
      if (type === 'image') {
        const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
        const uploadedImages = await UploadCtrl.uploadImages(images)
        successResponseWithData(res, '上传成功', { images: uploadedImages })
      }
    } 
  })

module.exports = router