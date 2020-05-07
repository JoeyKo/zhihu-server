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
    return await Article.findAndCountAll(param)
  }

  static async createArticle(data) {
    return await Article.create(data)
  }

  static async getArticle(id) {
    return await Article.findOne({ where: { id } })
  }

  static async updateArticle(id, data) {
    const article = await Article.findOne({ where: { id } })
    return await article.update(data)
  }

  static async delArticle(id) {
    const article = await Article.findOne({ where: { id } })
    await article.destroy()
  }
}

module.exports = ArticleController