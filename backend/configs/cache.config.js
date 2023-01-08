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

exports.expirationTimes = {
  timeFrame: 3600,
  locationQuery: 3600,
  userQuery: 3600,
  streamQuery: 3600
}