module.exports = {
  PORT: 5000, // server port 
  DB_URI: 'mongodb://mongo:27017/zhihu-app', // mongodb database uri
  JWT_SECRET: 'joeyko', // jwt secret
  JWT_EXPIRATION: 60 * 60 * 24 * 30 // jwt token expiration
}