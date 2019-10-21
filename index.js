const express = require('express')
const mongoose = require('mongoose')
const app = express()
const redis = require("redis")
const session = require('express-session')
const logger = require('./middlewares/logger')

// Connect to MongoDB
const mongoURI = 'mongodb://mongo:27017/zhihu-app'
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(mongoURI, options)
.then(res => {
  console.log('MongoDB Connected')
})
.catch(err => console.log('Mongodb error: ', err));

// redis and session
const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient(6379, 'redis')

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: 'zhihu',
    resave: false,
    cookie: { secure: true }
  })
)
redisClient.on("error", function (err) {
  console.log("Redis error: " + err);
});

// json parser
app.use(express.json())
// app.use(logger())

// api routes
const routes = require('./routes')
app.use('/api', routes)

// 404
app.use(function (req, res, next) {
  res.status(404).send('Sorry can\'t find that!')
})

// 5xx
app.use(function (error, req, res, next) {
  console.error(error.stack)
  res.status(500).send('Interval server error!')
})

const port = 3000;

app.listen(port, () => console.log('Server running...'));
