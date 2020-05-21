const fs = require('fs')
const Store = require('../models/store')
const File = require('../models/file')

const UPLOAD_STORE_DIR = 'uploads/store'
class StoreController {
  constructor() {
  }

  static async listStores(name) {
    return await Store.paginate(name, {
      populate: ['user', 'coverImage']
    })
  }

  static async createStore(params) {
    let storeData = { ...params }
    if (params.coverImage) {
      const oldpath = 'uploads' + params.coverImage.path
      const newPath = UPLOAD_STORE_DIR + params.coverImage.path.replace('tmp/tmp', 'coverImage')
      if (!fs.existsSync(UPLOAD_STORE_DIR)){
        fs.mkdirSync(UPLOAD_STORE_DIR);
      }
      fs.renameSync(oldpath, newPath)
      const newFile = await new File({ 
        name: params.coverImage.name, 
        type: 'image', 
        format: params.coverImage.mimetype, 
        size: params.coverImage.size, 
        path: newPath.replace('uploads', '')
      }).save();
      storeData.coverImage = newFile.id
    }

    const newStore = new Store(storeData)
    return await newStore.save()
  }

  static async updateStore(id, params) {
    return await Store.updateOne({ _id: id }, { $set: params }, { $runValidators: true })
  }

  static async getStore(id) {
    return await Store.findById(id).populate('coverImage')
  }

  static async delStore(id) {
    return await Store.deleteOne({ _id: id })
  }

}

module.exports = StoreController