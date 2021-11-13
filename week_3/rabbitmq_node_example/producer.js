const amqp = require('amqplib');

(async () => {
  try {
    const conn = await amqp.connect('amqp://localhost')
    const ch = await conn.createChannel()
    const queueName = 'bootcamp_queue'
    const msg = 'Fullstack Bootcamp - Node, Django, React';
    await ch.assertQueue(queueName, { durable: false })
    // Publish
    await ch.sendToQueue(queueName, Buffer.from(msg, 'utf8'))
    console.log('[x] Sent %s', msg)
    await ch.close()
    await conn.close()
  } catch (error) {
    console.error(error)
  }
})()
