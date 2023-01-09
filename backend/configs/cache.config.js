const { Client } = require('redis-om')

exports.client = new Client()

exports.createClient = async () => {
  if (!this.client.isOpen()) {
    console.log('Connecting to Redis...')
    this.client.open('redis://'+ (process.env.REDIS_HOST ?? 'localhost') +':' + (process.env.REDIS_PORT ?? 8000)).then(() => {
      console.log('Redis client connected')
    }).catch((err) => {
      console.log('Redis error : ' + err)
    })
  }
}

exports.expirationTimes = {
  timeFrame: 30*60,
  locationQuery: 30*60,
  userQuery: 30*60,
  streamQuery: 30*60
}