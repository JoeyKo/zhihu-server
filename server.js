const express = require('express')
const mongoose = require('mongoose')
const ampqlib = require('amqplib')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload');
const { scheduleInit } = require('./scripts/clean_tmp_files')

// config 
require('./config')

//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

// Connect to MongoDB
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(process.env.MONGO_URI, options)
  .then(res => {
    console.log('>>>>>>>>>> MongoDB Connected!')
  })
  .catch(err => console.log('Mongodb error: ', err));

// rabbitMQ
const q = 'tasks'
const open = ampqlib.connect(`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@rabbitmq:5672`);

open.then(conn => {
  return conn.createChannel()
}).then(ch => {
  return ch.assertQueue(q).then(() => {
    return ch.sendToQueue(q, Buffer.from('rabbitMQ has something to do'));
  });
}).catch(console.warn);

open.then(conn => {
  return conn.createChannel();
}).then(ch => {
  return ch.assertQueue(q).then(() => {
    return ch.consume(q, msg => {
      if (msg !== null) {
        console.log(msg.content.toString());
        ch.ack(msg);
      }
    });
  });
}).catch(console.warn);

// json parser
app.use(express.json())

// urlencoded payloads
app.use(express.urlencoded({ extended: true }))

// cors middleware
app.use(cors())

// log middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// cookie parser middleware
app.use(cookieParser())

// fileupload middleware
app.use(fileUpload());

// api routes
require('./routes')

// api swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 404
app.all('*', function (req, res, next) {
  res.status(404).send('Sorry can\'t find that!')
})

// 5xx
app.use(function (error, req, res, next) {
  console.error(error.stack)
  res.status(500).send('Interval server error!')
})

const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log('Server running...', port)
  // start node schedule
  scheduleInit()
});
