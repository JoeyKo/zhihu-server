const { sequelize, DataTypes } = require('../db/mysql')
const Article = require('../models/article')

class ArticleController {
  constructor(){
}
  /**
   * list all Articles
   * @param {Object} param - find filters
   * @returns {Promise<Article>}
   */
  static async listArticles(param) {
    return await Article(sequelize, DataTypes).findAndCountAll(param)
  }

  static async createArticle(data) {
    return await Article(sequelize, DataTypes).create(data)
  }
}

module.exports = ArticleController