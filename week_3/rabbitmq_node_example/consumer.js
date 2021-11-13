const amqp = require('amqplib');

(async () => {
  try {
    const conn = await amqp.connect('amqp://localhost')
    const ch = await conn.createChannel()
    const queueName = 'bootcamp_queue'
    // Subscribe
    await ch.consume(queueName, msg => {
      if (msg !== null) {
        console.log("Received '%s'", msg.content.toString());
        ch.ack(msg)
      }
    })
    await ch.close()
    await conn.close()
  } catch (error) {
    console.error(error)
  }
})()
