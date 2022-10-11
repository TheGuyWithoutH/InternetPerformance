/**
 * @file Useful queries of the MongoDB database
 * @author Ugo Balducci
 * @version 1.0.0
 */

const assert = require('node:assert').strict;
const { MongoClient, MongoError } = require("mongodb");
const Position = require('./position');

/**
 * Enum of types of queries
 */
exports.queryTypes = {
    SPATIAL: "space",
    TIME: "time",
    COMBINED: "combined",
    ALL: "all",
    USERID: "userId",
    STREAMID: "streamId"
}

/**
 * 
 * @param {MongoClient} db 
 * @param {object} parameters Javascript Object containing the parameters for the time request : @argument from specifies the start date while @argument to specifies the end date
 */
exports.latencyQuery = async (db, parameters) => {
    _checkCollectionExist(db, "latency");

    let query = {}

    if(parameters.from && parameters.to) assert(parameters.from < parameters.to, Error("End date before Start date"))

    if(parameters.from) {
        query.date = {}
        query.date.$gte = parameters.from.valueOf() / 1000
    }

    if(parameters.to) {
        if(!query.date) query.date = {}
        query.date.$lte = parameters.to.valueOf() / 1000
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

    return _dbQuery(db, "latency", [{$match: query}, accumulator(parameters.streamId), projection])
}


/**
 * 
 * @param {MongoClient} db 
 * @param {Position} location 
 * @param {Number} maxDistance 
 */
exports.locationQuery = (db, parameters) => {
    _checkCollectionExist(db, "user_locations");

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

    // console.log(query)

    return _dbQuery(db, "user_locations", [{$match: query}])
}


/**
 * 
 * @param {MongoClient} db 
 * @param {object} parameters 
 */
exports.query = (db, parameters, reqType) => {

    switch (reqType) {
        case this.queryTypes.TIME:
        case this.queryTypes.STREAMID:
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
        default:
            break;
    }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////


const _dbQuery = (db, collection, aggregation) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).aggregate(aggregation)
            .toArray((err, result) => {
                if (err) throw reject(err);
                resolve(result);
            });
    })
}


const _checkCollectionExist = (db, collName) => {
    db.listCollections({name: collName}).next(function(err, collinfo) {
        if (!collinfo) {
            // The collection does not exist
            throw new MongoError("The collection 'latency' does not exist")
        }
    });
}

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



const projection = {
    $project: {
        _id: 0,
        user_id: "$_id",
        latencies: {
            $sortArray: { input: "$latencies", sortBy: { date: 1 } }
         }
    }
}