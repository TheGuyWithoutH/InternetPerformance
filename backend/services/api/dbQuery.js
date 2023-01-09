/**
 * @file Useful queries of the MongoDB database
 * @author Ugo Balducci
 * @version 1.0.0
 */

const assert = require('node:assert').strict;
const { MongoClient, MongoError } = require("mongodb");
const { config } = require('../../configs/db.config');
const { extractLocationQuery } = require('../../utils/location');
const { saveLocationQueryInCache, getLocationQueryFromCache } = require('../cache/cacheQuery');

/**
 * Enum of types of queries
 */
exports.queryTypes = {
    SPATIAL: "space",
    TIME: "time",
    COMBINED: "combined",
    ALL: "all",
    USERID: "userId",
    STREAMID: "streamId",
    WORLD: "world",
    SEARCH: "search",
    TIMEFRAME: "timeframe",
    TABLE: "table"
}

/**
 * Performs the query on the specified database, on the collection with latencies and times.
 * @param {MongoClient} db The database to query
 * @param {Object} parameters Javascript Object containing the parameters for the time request : @argument from specifies the start date while @argument to specifies the end date
 * @param {Number} skip The number of documents to skip
 * @param {Number} limit The maximum number of documents to return
 * @param {Boolean} groupLatencies If true, the latencies will be grouped by user_id and stream_id
 * @returns {Promise} A promise containing the result of the query on database
 */
exports.latencyQuery = async (db, parameters, aggregation) => {
    _checkCollectionExist(db, config.latencyCollectionName);

    let query = {}

    if(parameters.from && parameters.to) assert(parameters.from < parameters.to, Error("End date before Start date"))

    if(parameters.from) {
        query.date = {}
        query.date.$gte = parameters.from.valueOf() / 1000
    }

    if(parameters.to) {
        if(!query.date) query.date = {}
        query.date.$lt = parameters.to.valueOf() / 1000
    }

    if(parameters.users) {
        query.user_id = {
            $in: parameters.users
        }
    }

    if(parameters.user_id) {
        query.user_id = parameters.user_id
    }

    if(parameters.stream_id) {
        query.stream_id = parameters.stream_id
    }

    var pipeline = [{$match: query}, {$sort: {[parameters.sortBy]: parameters.sortOrder, _id: 1}}].concat(aggregation)

    return _dbQuery(db, config.latencyCollectionName, pipeline)
}


/**
 * Performs the query on the specified database, on the collection containing users and their location.
 * @param {MongoClient} db The database to query
 * @param {Object} parameters Javascript Object containing the parameters for the spatial request
 * @returns {Promise} A promise containing the result of the query on database
 */
exports.locationQuery = async (db, parameters) => {
    _checkCollectionExist(db, config.userCollectionName);

    const query = extractLocationQuery(parameters)

    if(parameters.user_id) {
        query.user_id = parameters.user_id
    } else {
        // If the query is not for a specific user, we check if the query is in the cache
        const cachedQuery = await getLocationQueryFromCache(query)
        if(cachedQuery) return cachedQuery
    }

    return _dbQuery(db, config.userCollectionName, [{$match: query}]).then(result => {
        if(!parameters.user_id) result.forEach((elem) => saveLocationQueryInCache(elem, query))
        return result
    })
}

/**
 * 
 * @param {*} db 
 * @param {*} parameters 
 * @returns 
 */
exports.searchQuery = (db, parameters) => {
    _checkCollectionExist(db, config.locationCollectionName);

    if(!parameters.name) {
        return new Promise((resolve, reject) => {
            reject(new Error("Missing name parameter"))
        })
    }

    return _dbQuery(db, config.locationCollectionName, [
        {
            $match: 
            { 
                $and: [
                    {$text: { $search:  parameters.name }}, 
                    {'feature class': parameters.isCity ? "P" : "A"}
                ]
            }
        }, 
        { $sort: { score: { $meta: "textScore" } } },
        {$project: { name: 1, _id: 0 } }
    ])
}

/**
 * Manages all the logic to perform queries of different query types.
 * @param {MongoClient} db The database to query
 * @param {object} parameters Javascript Object containing the parameters for the request
 * @returns {Promise} A promise containing the result of the query on database
 */
exports.query = (db, parameters, reqType) => {
    
    switch (reqType) {
        case this.queryTypes.TIME:
        case this.queryTypes.STREAMID:
        case this.queryTypes.WORLD: {
            const aggregation = [accumulator(parameters.streamId), {$sort: {_id: 1}}, projection]
            return this.latencyQuery(db, parameters, aggregation).then(
                (doc) => {
                    const users = doc.map((elem) => elem.user_id)
                    
                    const params = {
                        users: users
                    };


                    return this.locationQuery(db, params).then(
                            (docEnd) => {
                                doc.forEach((elem) => {
                                    elem["location"] = docEnd.find((val) => val.user_id == elem.user_id).location
                            })
                            return doc
                    })
                })
            }
        case this.queryTypes.ALL:
        case this.queryTypes.SPATIAL:
        case this.queryTypes.COMBINED:
        case this.queryTypes.USERID:
            return this.locationQuery(db, parameters).then(
                (doc) => {
                    const users = doc.map((elem) => elem.user_id)
                    
                    const params = structuredClone(parameters)
                    params.users = users

                    const aggregation = [accumulator(parameters.streamId), {$sort: {_id: 1}}, projection]
        
                    return this.latencyQuery(db, params, aggregation).then(
                            (docEnd) => {
                                docEnd.forEach((elem) => {
                                    elem["location"] = doc.find((val) => val.user_id == elem.user_id).location
                                })
                                return docEnd
                            })
                        })
        case this.queryTypes.SEARCH:
            return this.searchQuery(db, parameters)
        case this.queryTypes.TIMEFRAME:
            const aggregation = [{$bucket: { groupBy: "$date", boundaries: parameters.boundaries, output: {"latency_count": { $sum: 1 }, users: { $push: "$user_id" }}}}, {$project: {_id: 0, "from": "$_id", "to": { $add : ["$_id", parameters.frame] }, "latency_count": "$latency_count", "users": "$users"}}]
            return this.latencyQuery(db, parameters, aggregation)
        case this.queryTypes.TABLE:
            return this.locationQuery(db, parameters).then(
                (doc) => {
                    const users = doc.map((elem) => elem.user_id)
                    
                    const params = structuredClone(parameters)
                    params.users = users

                    const aggregation = []

                    if(parameters.skip > 0) aggregation.push({$skip: parameters.skip})
                    if(parameters.limit > 0) aggregation.push({$limit: parameters.limit})

                    aggregation.push({ $project: {_id: 0}})
        
                    return this.latencyQuery(db, params, aggregation).then(
                            (docEnd) => {
                                docEnd.forEach((elem) => {
                                    elem["location"] = doc.find((val) => val.user_id == elem.user_id).location
                                })
                                return docEnd
                            })
                        })
        default:
            break;
    }

}


/* ________________________________________________________________________________________________________________ */

/**
 * Sends the query to the database.
 * @param {MongoClient} db The database to look into
 * @param {String} collection The name of the collection
 * @param {Array<Object>} aggregation The aggregation pipeline for the query
 * @returns {Promise} A promise containing the result of the query on database in an array
 */
const _dbQuery = (db, collection, aggregation) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).aggregate(aggregation)
            .toArray((err, result) => {
                if (err) throw reject(err);
                resolve(result);
            });
    })
}

/**
 * Check that a collection exists inside a database.
 * @param {MongoClient} db The database to look into
 * @param {String} collName The name of the collection
 * @throws {MongoError} an error if the collection is not found
 */
const _checkCollectionExist = (db, collName) => {
    db.listCollections({name: collName}).next(function(err, collinfo) {
        if (!collinfo) {
            // The collection does not exist
            throw new MongoError("The collection " + collName + " does not exist")
        }
    });
}

/**
 * Prepare the accumulator for aggregation pipeline to combine outputs from same user.
 * @param {Boolean} streamId Decides wether to includes stream ids or not in results
 * @returns {Object} The accumulator "$group" for the aggregation pipeline
 */
const accumulator = (streamId) => {
    if(streamId)
        return {
            $group: {
                _id: "$user_id",
                latencies: {
                    $push: {
                        date: "$date", 
                        latency: "$latency",
                        stream_id: "$stream_id"
                    }
                } 
            }
        }
    else
        return {
            $group: {
                _id: "$user_id",
                latencies: {
                    $push: {
                        date: "$date", 
                        latency: "$latency",
                    }
                } 
            }
        }
}


/**
 * Projection of data for the aggregation pipeline in order to reformat the outputs.
 */
const projection = {
    $project: {
        _id: 0,
        user_id: "$_id",
        latencies: {
            $sortArray: { input: "$latencies", sortBy: { date: 1 } }
         }
    }
}