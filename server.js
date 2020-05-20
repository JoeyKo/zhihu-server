const express = require('express')
const mongoose = require('mongoose')

const app = express()
const cors = require('cors')
const morgan = require('morgan')
const fileUpload = require('express-fileupload');
// const { scheduleInit } = require('./scripts/clean_tmp_files')
const { requestResponseHandler } = require('./handlers')
const { errorResponse } = requestResponseHandler


// config
require('./config')

mongoDBConnect()

const { errorHandler } = require('./handlers');
const {
  bodyParserHandler,
  globalErrorHandler,
  fourOhFourHandler,
  fourOhFiveHandler
} = errorHandler

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

app.use(express.static('public'))
app.use(express.static('uploads'));

// template engine
app.set('view engine', 'pug')

// cors middleware
app.use(cors())

// urlencoded payloads
app.use(express.urlencoded({ extended: true }))

// json parser
app.use(express.json())

// error handling specific to body parser only
app.use(bodyParserHandler)

// log middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.get('/', function (req, res) {
  res.render('index', { })
})

// fileupload middleware
app.use(fileUpload({
  createParentPath: true,
  useTempFiles : true,
  tempFileDir : '/tmp/',
  limits: { fileSize: 2 * 1024 * 1024 },
  limitHandler: (req, res) => {
    return errorResponse(res, '上传文件不能超过2M')
  }
}));


// api routes
require('./routes')(app)

// api swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch-all for 404 "Not Found" errors
app.use(fourOhFourHandler)

// catch-all for 405 "Method Not Allowed" errors
app.use(fourOhFiveHandler)

app.use(globalErrorHandler)

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server is running.')
  // // schedule init
  // scheduleInit()
});

app.on('error', (e) => {
  console.log('Server error: ', e)
});

// Connect to MongoDB
async function mongoDBConnect() {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    await mongoose.connect(process.env.MONGO_URI, options)
    console.log('>>>>>>>>>> MongoDB Connected!')
  } catch (err) {
    err => console.log('Mongodb error: ', err)
  }
}
