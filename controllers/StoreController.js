const fs = require('fs')
const Store = require('../models/store')
const File = require('../models/file')

const UPLOAD_STORE_DIR = 'uploads/store'

function moveFileAndReturnNewPath(image) {
  const oldpath = 'uploads' + image.path
  const newPath = UPLOAD_STORE_DIR + image.path.replace('tmp/tmp', 'coverImage')
  if (!fs.existsSync(UPLOAD_STORE_DIR)){
    fs.mkdirSync(UPLOAD_STORE_DIR);
  }
  fs.renameSync(oldpath, newPath)
  return newPath
}

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
      const newPath = moveFileAndReturnNewPath(params.coverImage)
      const newFile = await new File({ 
        ...params.coverImage, 
        type: 'image', 
        path: newPath.replace('uploads', '')
      }).save();
      storeData.coverImage = newFile.id
    }

    const newStore = new Store(storeData)
    return await newStore.save()
  }

  static async updateStore(id, params) {
    if (params.coverImage) {
      const store = await Store.findById(id)
      const newPath = moveFileAndReturnNewPath(params.coverImage)
      await File.updateOne({ _id: store.coverImage }, { $set: {
        ...params.coverImage,
        path: newPath.replace('uploads', '')
      } }, { $runValidators: true })
      return await Store.updateOne({ _id: id }, { $set: { ...params, coverImage: store.coverImage } }, { $runValidators: true })
    }
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