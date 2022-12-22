const { Client, Entity, Schema } = require('redis-om')

exports.client = new Client()

exports.createClient = async () => {
  if (!this.client.isOpen()) {
    this.client.open('redis://'+ process.env.REDIS_HOST +':' + process.env.REDIS_PORT).then(() => {
      console.log('Redis client connected')
    }).catch((err) => {
      console.log('Redis error : ' + err)
    })
  }
}