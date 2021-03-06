const helthCheck = require('./healthCheck')
const user = require('./user')
const article = require('./article')
const store = require('./store')
const upload = require('./upload')
const question = require('./question')

module.exports = app => {
  app.use('/api/health-check', helthCheck)
  app.use('/api/user', user)
  app.use('/api/article', article)
  app.use('/api/store', store)
  app.use('/api/file', upload)
  app.use('/api/question', question)
}