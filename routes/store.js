const express = require('express')
const router = express.Router();
const StoreCtrl = require('../controllers/StoreController')
const { requestResponseHandler } = require('../handlers')
const { successResponseWithData, errorResponse } = requestResponseHandler

router.route('/')
  .get(async (req, res) => {
    try {
      const stores = await StoreCtrl.listStores()
      successResponseWithData(res, null, { 
        data: stores.docs, 
        pageSize: stores.limit, 
        current: stores.page, 
        count: stores.totalDocs, 
      })
    } catch (err) {
      errorResponse(res, err.message)
    }
  })

  .post(async (req, res) => {
    try {
      const storeCreated = await StoreCtrl.createStore(req.body)
      successResponseWithData(res, null, { store: storeCreated })
    } catch (err) {
      errorResponse(res, err.message)
    }
  })

router.route('/:id')
	.get(async (req, res) => {
		const { id } = req.params
		const results = await StoreCtrl.getStore(id)
		successResponseWithData(res, null, results)
	})

	.put(async (req, res) => {
		const { id } = req.params
		const result = await StoreCtrl.updateStore(id, req.body)
		successResponseWithData(res, null, result)
	})
module.exports = router