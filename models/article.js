'use strict';
const Sequelize = require('sequelize');
const { sequelize } = require('../db/mysql')

const Model = Sequelize.Model;

class Article extends Model {}
Article.init({
  // attributes
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  rawContent: {
    type: Sequelize.TEXT
  },
  htmlContent: {
    type: Sequelize.TEXT
  }
}, {
  sequelize,
  modelName: 'Article'
  // options
});

module.exports = Article