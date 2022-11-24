/**
 * @file Useful queries of the MongoDB database
 * @author Ugo Balducci
 * @version 1.0.0
 */

const assert = require('node:assert').strict;
const { MongoClient, MongoError } = require("mongodb");
const { config } = require('../../configs/db.config');

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
    SEARCH: "search"
}

/**
 * Performs the query on the specified database, on the collection with latencies and times.
 * @param {MongoClient} db The database to query
 * @param {Object} parameters Javascript Object containing the parameters for the time request : @argument from specifies the start date while @argument to specifies the end date
 * @returns {Promise} A promise containing the result of the query on database
 */
exports.latencyQuery = async (db, parameters) => {
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

    return _dbQuery(db, config.latencyCollectionName, [{$match: query}, accumulator(parameters.streamId), projection])
}


/**
 * Performs the query on the specified database, on the collection containing users and their location.
 * @param {MongoClient} db The database to query
 * @param {Object} parameters Javascript Object containing the parameters for the spatial request
 * @returns {Promise} A promise containing the result of the query on database
 */
exports.locationQuery = (db, parameters) => {
    _checkCollectionExist(db, config.userCollectionName);

    const query = {}

    if(parameters.coordinates) {
        parameters.maxDistance = parameters.maxDistance || 1000;
        query['location.coordinates'] = {
            $geoWithin: {
                $centerSphere: [parameters.coordinates, parameters.maxDistance/6378100]
            }
        }
    }

    if(parameters.country) {
        query['location.country'] = parameters.country
    }

    if(parameters.country_code) {
        query['location.country_code'] = parameters.country_code
    }

    if(parameters.region) {
        query['location.region'] = parameters.region
    }

    if(parameters.county) {
        query['location.county'] = parameters.county
    }

    if(parameters.city) {
        query['location.city'] = parameters.city
    }

    if(parameters.user_id) {
        query.user_id = parameters.user_id
    }

    return _dbQuery(db, config.userCollectionName, [{$match: query}])
}

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
            case this.queryTypes.WORLD:
            return this.latencyQuery(db, parameters).then(
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
        case this.queryTypes.ALL:
        case this.queryTypes.SPATIAL:
        case this.queryTypes.COMBINED:
        case this.queryTypes.USERID:
            return this.locationQuery(db, parameters).then(
                (doc) => {
                    const users = doc.map((elem) => elem.user_id)
                    
                    const params = structuredClone(parameters)
                    params.users = users
        
                    return this.latencyQuery(db, params).then(
                            (docEnd) => {
                                docEnd.forEach((elem) => {
                                    elem["location"] = doc.find((val) => val.user_id == elem.user_id).location
                                })
                                return docEnd
                            })
                        })
        case this.queryTypes.SEARCH:
            return this.searchQuery(db, parameters)
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