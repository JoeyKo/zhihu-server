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

  static async getArticle(id) {
    return await Article(sequelize, DataTypes).findOne({ where: { id } })
  }

  static async updateArticle(id, data) {
    const article = await Article(sequelize, DataTypes).findOne({ where: { id } })
    return await article.update(data)
  }
}

module.exports = ArticleController