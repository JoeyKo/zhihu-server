const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize')

// MySQL ORM
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_ROOT_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

sequelize
  .authenticate()
  .then(() => {
    console.log('>>>>>>>>>> MySQL Connected!');
  })
  .catch(err => {
    console.error('MySQL error:', err);
  });


module.exports = {
  Sequelize: Sequelize,
  DataTypes: DataTypes,
  sequelize: sequelize,
}
