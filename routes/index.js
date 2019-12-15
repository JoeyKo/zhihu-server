const express = require('express')
const router = express.Router()
const app = express()

const helthCheck = require('./healthCheck')
const user = require('./user')
const article = require('./article')
const store = require('./store')
const upload = require('./upload')

app.use('/api/helthCheck', helthCheck)
app.use('/api/user', user)
app.use('/api/article', article)
app.use('/api/store', store)
app.use('/api/upload', upload)


module.exports = router