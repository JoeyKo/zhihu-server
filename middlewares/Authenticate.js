const JWTAuth = require('./JWTAuth')
const RedisAuth = require('./RedisAuth')

const Authenticate = [JWTAuth, RedisAuth]

module.exports = Authenticate;
