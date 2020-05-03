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

  static async updateStore(id, params) {
    return await Store.updateOne({ _id: id }, { $set: params }, { $runValidators: true })
  }

  static async getStore(id) {
    return await Store.findById(id)
  }

}

module.exports = StoreController