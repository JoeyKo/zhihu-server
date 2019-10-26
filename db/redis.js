const redis = require("redis")

// redis
const redisClient = redis.createClient(6379, 'redis')

redisClient.on('connect',()=>{
  console.log('Redis client connected')
  });

redisClient.on("error", function (err) {
  console.log("Redis error: " + err);
});

module.exports = {
  redis: redis,
  redisClient: redisClient
}
