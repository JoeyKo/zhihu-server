const express = require('express')
const router = express.Router();
const StoreCtrl = require('../controllers/StoreController')
const { requestResponseHandler } = require('../handlers')
const { successResponseWithData } = requestResponseHandler

router.route('/store')
  .get(async (req, res) => {
    const stores = await StoreCtrl.listStores()
    successResponseWithData(res, null, { stores })
  })

  .post(async (req, res) => {
    const { location, user } = req.body
    const storeCreated = await StoreCtrl.createStore({
      location,
      user
    })
    successResponseWithData(res, null, { store: storeCreated })
  })

module.exports = router