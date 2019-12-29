const Store = require('../models/store')

class StoreController {
  constructor() {
  }

  static async listStores(name, select, populate) {
    return await await Store.paginate(name || '', {
      select: select || { location: 1, user: 1 },
      populate: populate || { path: 'user' }
    })
  }

  static async createStore(params) {
    const newItem = new Store(params)
    return await newItem.save()
  }
}

module.exports = StoreController