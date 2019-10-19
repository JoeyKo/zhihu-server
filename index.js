const express = require('express')
const mongoose = require('mongoose')
const app = express()
const logger = require('./middlewares/logger')

const routes = require('./routes')

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/zhihu-app',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(express.json())
// app.use(logger())
app.use('/api', routes)

app.use(function (req, res, next) {
  res.status(404).send('Sorry can\'t find that!')
})

app.use(function (error, req, res, next) {
  console.error(error.stack)
  res.status(500).send('Something broke!')
})

const port = 3000;

app.listen(port, () => console.log('Server running...'));
