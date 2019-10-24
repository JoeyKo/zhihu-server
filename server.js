const express = require('express')
const mongoose = require('mongoose')
const app = express()
const redis = require("redis")
const config = require('./config')

// Connect to MongoDB
const mongoURI = config.DB
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(mongoURI, options)
.then(res => {
  console.log('MongoDB Connected')
})
.catch(err => console.log('Mongodb error: ', err));

// redis
const redisClient = redis.createClient(6379, 'redis')
redisClient.on('connect',()=>{
  console.log('Redis client connected')
  });
redisClient.on("error", function (err) {
  console.log("Redis error: " + err);
});

// json parser
app.use(express.json())
// urlencoded payloads
app.use(express.urlencoded({ extended: true }))

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

const port = config.PORT;

app.listen(port, () => console.log('xServer running...'));
