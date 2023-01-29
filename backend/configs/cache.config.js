/**
 * @file Configuration file for the Redis cache
 * @author Ugo Balducci
 * @version 1.0.0
 */

const { Client } = require('redis-om')

// Caching client saved for later use
exports.client = new Client()

/**
 * Connect the client to the Redis server
 * @return {Client} The client to connect to
 * @async
 */
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

/**
 * Parameters of expiration times for the different queries
 */
exports.expirationTimes = {
  timeFrame: 30*60,
  locationQuery: 30*60,
  userQuery: 30*60,
  streamQuery: 30*60
}