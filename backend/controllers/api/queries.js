/**
 * @file Controllers for the API queries
 * @author Ugo Balducci
 * @version 1.0.0
 */

const {Request, Response, NextFunction} = require('express')
const assert = require('node:assert').strict;
const {query, queryTypes} = require('../../services/api/dbQuery');
const stats = require('../../services/api/arrayStatistics')
const { dbConnect } = require('../../configs/db.config');
const { saveStreamQueryInCache, saveUserQueryInCache, getUserQueryFromCache, getStreamQueryFromCache } = require('../../services/cache/cacheQuery');


const db = dbConnect()

/**
 * Controller for global queries based on location or time.
 * @param {Request} req The HTTP request received
 * @param {Response} res The HTTP response that will be sent back
 * @param {NextFunction} next The next middleware/controller to execute
 */
exports.makeGlobalQuery = (req, res, next) => {

    let queryType;

    //Check if query contains spatial params. If so, check formatting and transform coordinates into array
    if(req.query.coordinates || req.query.country || req.query.country_code || req.query.region || req.query.county || req.query.city) {
        assert((req.query.country || req.query.country_code || req.query.region || req.query.county || req.query.city) ? !req.query.coordinates : req.query.coordinates, Error("Arguments wrongly formatted : location"))
        queryType = queryTypes.SPATIAL
    }
    
    //Check if query contains time params. If so, refactor dates.
    if(req.query.from || req.query.to) {
        queryType = queryType === queryTypes.SPATIAL ? queryTypes.COMBINED : queryTypes.TIME
    }

    if(Object.keys(req.query).length == 0 || !queryType) {
        queryType = queryTypes.ALL
    }

    query(db, req.query, queryType)
        .then((doc) => {
            let result = {}
                
            if(doc.length > 0) {
                const latencyArray = doc.flatMap((elem) => elem.latencies.map((data) => data.latency))

                result = req.query.latencyOnly ?
                    {
                        pagination: formatPagination(req.query),
                        stats: makeStats(latencyArray),
                        latencies: doc.flatMap((elem) => elem.latencies)
                    } : {
                        pagination: formatPagination(req.query),
                        stats: makeStats(latencyArray),
                        users: doc
                    }
            }

            res.status(200).json(result)
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({
                error: error.message
            });
        })
    
           
}


exports.makeRecentQuery = (req, res, next) => {
    let queryType = queryTypes.RECENT

    assert(req.query.country || req.query.country_code, Error("Country-level data required"))
    assert(req.query.game, Error("Game data required"))

    if(!req.query.range) {
        req.query.range = 5 * 60  
    }else{
        req.query.range = parseInt(req.query.range) * 60
    }

    query(db, req.query, queryType)
        .then((doc) => {
            let result = {}
                
            if(doc.length > 0) {
                const latencyArray = doc.flatMap((elem) => elem.latencies.map((data) => data.latency))
                result = makeStats(latencyArray)
            }

            res.status(200).json(result)
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({
                error: error
            });
        })
    
}


/**
 * Controller for queries by user id
 * @param {Request} req The HTTP request received
 * @param {Response} res The HTTP response that will be sent back
 * @param {NextFunction} next The next middleware/controller to execute
 */
exports.makeUserIdQuery = async (req, res, next) => {
    if(!req.query.id) throw new Error("Missing argument in query : 'id'.")

    //Check if query is in cache
    const cachedQuery = await getUserQueryFromCache(req.query.id)

    if(cachedQuery) {
        const latencyArray = cachedQuery.latencies.map((data) => data.latency)

        let result = req.query.latencyOnly ?
            {
                stats: makeStats(latencyArray),
                latencies: cachedQuery.latencies
            } : {
                stats: makeStats(latencyArray),
                user: cachedQuery
            }
        
        res.status(200).json(result)
        return
    }
    
    query(db, {user_id: req.query.id, streamOn: "on", sortBy: req.query.sortBy, sortOrder: req.query.sortOrder}, queryTypes.USERID)
        .then((doc) => {
            let result = {}
            
            if(doc.length > 0) {
                const user = doc[0]
                const latencyArray = user.latencies.map((data) => data.latency)
                user.latencies = user.latencies.map((data) => { if(req.query.streamId) delete data.stream_id; return data })

                //Cache user query
                saveUserQueryInCache(user)

                result = req.query.latencyOnly ?
                {
                    pagination: formatPagination(req.query),
                    stats: makeStats(latencyArray),
                    latencies: user.latencies
                } : {
                    pagination: formatPagination(req.query),
                    stats: makeStats(latencyArray),
                    user: user
                }
            }

            res.status(200).json(result)
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({
                error: error.message
            });
        })
}

/**
 * Controller for queries based on stream id
 * @param {Request} req The HTTP request received
 * @param {Response} res The HTTP response that will be sent back
 * @param {NextFunction} next The next middleware/controller to execute
 */
exports.makeStreamIdQuery = async (req, res, next) => {
    if(!req.query.id) throw new Error("Missing argument in query : 'id'.")

    //Check if query is in cache
    const cachedQuery = await getStreamQueryFromCache(req.query.id)
    if(cachedQuery) {
        const latencyArray = cachedQuery.latencies.map((data) => data.latency)

        let result = req.query.latencyOnly ?
                {
                    stats: makeStats(latencyArray),
                    latencies: cachedQuery.latencies
                } : {
                    stats: makeStats(latencyArray),
                    stream: cachedQuery
                }

        console.log("Query in cache")

        return res.status(200).json(result)
    }

    query(db, {stream_id: req.query.id, streamOn: "off", sortBy: req.query.sortBy, sortOrder: req.query.sortOrder}, queryTypes.STREAMID)
        .then((doc) => {
            let result = {}

            if(doc.length > 0) {
                const user = doc[0]
                const latencyArray = user.latencies.map((data) => data.latency)
                const stream = {
                    stream_id: req.query.id,
                    user_id: user.user_id,
                    latencies: user.latencies,
                    location: user.location
                }

                saveStreamQueryInCache(stream)

                result = req.query.latencyOnly ?
                {
                    pagination: formatPagination(req.query),
                    stats: makeStats(latencyArray),
                    latencies: user.latencies
                } : {
                    pagination: formatPagination(req.query),
                    stats: makeStats(latencyArray),
                    stream: stream
                }
            }
            
            res.status(200).json(result)
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({
                error: error.message
            });
        })
}

/**
 * Controller for world map queries
 * @param {Request} req The HTTP request received
 * @param {Response} res The HTTP response that will be sent back
 * @param {NextFunction} next The next middleware/controller to execute
 */
exports.makeWorldQuery = (req, res, next) => {
    query(db, {sortBy: req.query.sortBy, sortOrder: req.query.sortOrder}, queryTypes.WORLD)
        .then((doc) => {
            let result = []
            console.log(doc)

            if(doc.length > 0) {
                result = doc.map((elem) => {
                    return {
                        country: elem.location.country_code
                    }
                })
                
                result = result.reduce((group, elem) => {
                    const { country } = elem;
                    group[country] = group[country] ?? { count: 0 };
                    group[country] = { count: group[country].count + 1 };
                    return group;
                  }, {});
            }
            res.status(200).json(result)
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({
                error: error.message
            });
        })
}


/* ________________________________________________________________________________________________________________ */


/**
 * Make basic statistics about an array of numbers like mean, standard deviation, median and some quantiles.
 * @param {Array<Number>} array Number array to analyze
 * @returns {Object} Javascript Object containing all the statistics
 */
const makeStats = (array) => {
    return {
        mean: stats.mean(array),
        sd: stats.standardDeviation(array),
        quartile1: stats.Q1(array),
        median: stats.median(array),
        quartile3: stats.Q3(array),
        "10%": stats.quantile(array, 0.1),
        "90%": stats.quantile(array, 0.9),
        "99%": stats.quantile(array, 0.99)
    }
}

const formatPagination = (query) => {
    return {
        "number of results": query.limit,
        page: query.page
    }
}