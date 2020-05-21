class UploadController {
  constructor() {
  }

  static async uploadImages(images) {
    return images.map(image => {
      const tmpName = image.tempFilePath + '.jpg'
      image.mv('uploads/' + tmpName)
      return {
        name: image.name,
        path: tmpName,
        mimetype: image.mimetype,
        size: image.size
      }
    })
  }
}

module.exports = UploadController