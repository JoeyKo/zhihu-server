const Store = require('../models/store')

class StoreController {
  constructor() {
  }

  static async listStores(name, select, populate) {
    return await Store.paginate(name || '', {
      select: select || { location: 1, user: 1 },
      populate: populate || { path: 'user' }
    })
  }

  static async createStore(params) {
    const newStore = new Store(params)
    return await newStore.save()
  }
}

module.exports = StoreController