const express = require('express')
const router = express.Router()
const UploadCtrl = require('../controllers/UploadController')
const { requestResponseHandler } = require('../handlers')
const { successResponse, errorResponse } = requestResponseHandler

router.route('/upload')
  .post(async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
      return errorResponse(res, 'No files were uploaded');
    }
    const { type } = req.query
    console.log(type)
    if (type === 'image') {
      const { width, height } = req.query
      const result = await UploadCtrl.uploadImages(req.files, { width, height })
      const { status, data } = result;
      if (status === 0) {
        return errorResponse(res, 'images upload failed!')
      }
      return successResponse(res, null, { files: [data] })
    }
  })

module.exports = router