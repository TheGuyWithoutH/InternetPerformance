/**
 * @file
 * @author Ugo Balducci
 * @version 1.0.0
 */

const { Repository } = require('redis-om')
const { client, expirationTimes } = require('../../configs/cache.config')
const { timeFrameSchema, locationQuerySchema, userQuerySchema, streamQuerySchema } = require('./cacheSchemas')

const crypto = require('crypto')


////////////////////START REPOSITORIES AND MAKE INDEXES//////////////////////////

let timeframeRepository, locationQueryRepository, userQueryRepository, streamQueryRepository;

if (!process.env.CACHING || process.env.CACHING === 'on') {

    timeframeRepository = client.fetchRepository(timeFrameSchema)
    timeframeRepository.createIndex();
    
    locationQueryRepository = client.fetchRepository(locationQuerySchema)
    locationQueryRepository.createIndex();
    
    userQueryRepository = client.fetchRepository(userQuerySchema)
    userQueryRepository.createIndex();
    
    streamQueryRepository = client.fetchRepository(streamQuerySchema)
    streamQueryRepository.createIndex();

}


/////////////////////////////SAVE IN CACHE///////////////////////////////////////

/**
 * Save a timeFrame in the cache
 * @param {Object} timeFrame the timeFrame object to save in the cache
 * @param {Object} location the location of the timeFrame
 * @returns {Promise} the promise of the save operation
 * @throws {Error} if the timeFrame is not valid
 */
exports.saveTimeFrameInCache = async (timeFrame, location) => {
    if (process.env.CACHING && process.env.CACHING === 'off') {
        return
    }

    if (timeFrame.from && timeFrame.to && timeFrame.user_count && timeFrame.latency_count && location) {
        const timeFrameEntity = timeframeRepository.createEntity()

        timeFrameEntity.from = timeFrame.from
        timeFrameEntity.to = timeFrame.to
        timeFrameEntity.user_count = timeFrame.user_count
        timeFrameEntity.latency_count = timeFrame.latency_count
        timeFrameEntity.location = JSON.stringify(location)

        return timeframeRepository.save(timeFrameEntity).then((id) => 
            client.execute(['EXPIRE', `TimeFrame:${id}`, expirationTimes.timeFrame]))
    } else {
        throw new Error('Invalid timeFrame object')
    }
}


/**
 * Save a locationQuery in the cache
 * @param {Object} locationQuery the locationQuery object to save in the cache
 * @param {Object} query the query that returned the location results
 * @returns {Promise} the promise of the save operation
 */
exports.saveLocationQueryInCache = async (locationQuery, query) => {
    if (process.env.CACHING && process.env.CACHING === 'off') {
        return null
    }

    if (locationQuery.user_id && locationQuery.location && query) {
        const hash = hashQuery(query)
        
        const locationQueryEntity = await locationQueryRepository.search()
                                                                .where('queries').contains(hash)
                                                                .returnFirst()
                                                                .then((entity) =>
                                                                    entity ? entity : locationQueryRepository.createEntity())

        locationQueryEntity.user_id = locationQuery.user_id
        locationQueryEntity.location = JSON.stringify(locationQuery.location)
        locationQueryEntity.queries = locationQueryEntity.queries ? [ ...locationQueryEntity.queries, hash ] : [ hash ]

        return locationQueryRepository.save(locationQueryEntity).then((id) =>
            client.execute(['EXPIRE', `LocationQuery:${id}`, expirationTimes.locationQuery]))
    } else {
        throw new Error('Invalid locationQuery object')
    }
}


/**
 * Save a user query in the cache
 * @param {Object} userQuery the userQuery object to save in the cache
 * @returns {Promise} the promise of the save operation
 * @throws {Error} if the userQuery object is not valid
 */
exports.saveUserQueryInCache = async (userQuery) => {
    if (process.env.CACHING && process.env.CACHING === 'off') {
        return null
    }

    if (userQuery.user_id && userQuery.latencies && userQuery.location) {
        const userQueryEntity = userQueryRepository.createEntity()
        userQueryEntity.user_id = userQuery.user_id
        userQueryEntity.latencies = userQuery.latencies.map(elem => JSON.stringify(elem))
        userQueryEntity.location = JSON.stringify(userQuery.location)

        return userQueryRepository.save(userQueryEntity).then((id) =>
            client.execute(['EXPIRE', `UserQuery:${id}`, expirationTimes.userQuery]))
    } else {
        throw new Error('Invalid userQuery object')
    }
}


/**
 * Save a stream query in the cache
 * @param {Object} streamQuery the streamQuery object to save in the cache
 * @returns {Promise} the promise of the save operation
 * @throws {Error} if the streamQuery object is not valid
 */
exports.saveStreamQueryInCache = async (streamQuery) => {
    if (process.env.CACHING && process.env.CACHING === 'off') {
        return null
    }

    if (streamQuery.stream_id && streamQuery.user_id && streamQuery.latencies && streamQuery.location) {
        const streamQueryEntity = streamQueryRepository.createEntity()
        streamQueryEntity.stream_id = streamQuery.stream_id
        streamQueryEntity.user_id = streamQuery.user_id
        streamQueryEntity.latencies = streamQuery.latencies.map(elem => JSON.stringify(elem))
        streamQueryEntity.location = JSON.stringify(streamQuery.location)

        return streamQueryRepository.save(streamQueryEntity).then((id) =>
            client.execute(['EXPIRE', `StreamQuery:${id}`, expirationTimes.streamQuery]))
    } else {
        throw new Error('Invalid streamQuery object')
    }
}


/////////////////////////////GET FROM CACHE///////////////////////////////////////


/**
 * Get a timeFrame from the cache
 * @param {Number} from the from timestamp of the timeFrame
 * @param {Number} to the to timestamp of the timeFrame
 * @param {Object} location the location of the timeFrame
 * @returns {Promise} the promise of the get operation
 */
exports.getTimeFrameFromCache = async (from, to, location) => {
    if (process.env.CACHING && process.env.CACHING === 'off') {
        return null
    }

    return timeframeRepository.search().where('from').equals(from)
                                    .and('to').equals(to)
                                    .and('location').equal(JSON.stringify(location))
                                    .returnFirst()
                                    .then((timeFrameEntity) => 
                                        timeFrameEntity ? timeFrameEntity.timeframe() : null)
}


/**
 * Get a locationQuery from the cache
 * @param {Object} query the query that returns the location results
 * @returns {Promise} the promise of the get operation
 */
exports.getLocationQueryFromCache = async (query) => {
    if (process.env.CACHING && process.env.CACHING === 'off') {
        return null
    }

    return locationQueryRepository.search().where('queries').contains(hashQuery(query))
                                            .returnAll()
                                            .then((locationEntities) => {
                                                return locationEntities.length ? locationEntities.map((locationEntity) => locationEntity.userAtLocation()) : null})
}


/**
 * Get a userQuery from the cache
 * @param {String} userId the id of the user
 * @returns {Promise} the promise of the get operation
 */
exports.getUserQueryFromCache = async (userId) => {
    if (process.env.CACHING && process.env.CACHING === 'off') {
        return null
    }

    return userQueryRepository.search().where('user_id').equals(userId)
                                        .returnFirst()
                                        .then((userEntity) =>
                                            userEntity ? userEntity.user() : null)
}


/**
 * Get a streamQuery from the cache
 * @param {String} streamId the id of the stream
 * @returns {Promise} the promise of the get operation
 */
exports.getStreamQueryFromCache = async (streamId) => {
    if (process.env.CACHING && process.env.CACHING === 'off') {
        return null
    }

    return streamQueryRepository.search().where('stream_id').equals(streamId)
                                            .returnFirst()
                                            .then((streamEntity) =>
                                                streamEntity ? streamEntity.stream() : null)
}



/////////////////////////////PRIVATE METHODS///////////////////////////////////////

/**
 * Hash the query object
 * @param {Object} query the query object to hash
 * @returns {String} the hash of the query object
 * @private
 */
const hashQuery = (query) => {
    return crypto.createHash('md5').
        update(JSON.stringify(query)).
        digest('hex')
}