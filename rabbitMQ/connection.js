const ampqlib = require('amqplib')

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