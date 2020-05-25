const express = require('express')
const router = express.Router();
const authenticate = require('../middlewares/Authenticate');
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

  .post(authenticate, async (req, res) => {
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
		const result = await StoreCtrl.getStore(id)
		successResponseWithData(res, null, { store: result })
	})

	.put(authenticate, async (req, res) => {
    try {
      const { id } = req.params
      const result = await StoreCtrl.updateStore(id, req.body)
      successResponseWithData(res, null, { store: result })
    } catch (err) {
      errorResponse(res, err.message)
    }
  })
  
  .delete(authenticate, async (req, res) => {
    const { id } = req.params
    const result = await StoreCtrl.delStore(id)
    successResponseWithData(res, 'delete successfully!', result)
  })

module.exports = router