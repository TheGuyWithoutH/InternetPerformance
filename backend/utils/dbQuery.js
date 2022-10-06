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
    USERID: "userId",
    STREAMID: "streamId"
}

/**
 * 
 * @param {MongoClient} db 
 * @param {object} parameters Javascript Object containing the parameters for the time request : @argument from specifies the start date while @argument to specifies the end date
 */
exports.timeQuery = async (db, parameters) => {
    _checkCollectionExist(db, "latency");

    let query = {
        date: {
        }
    }

    if(parameters.from && parameters.to) assert(parameters.from < parameters.to, Error("End date before Start date"))

    if(parameters.from) {
        query.date.$gte = parameters.from.valueOf() / 1000
    }

    if(parameters.to) {
        query.date.$lte = parameters.to.valueOf() / 1000
    }

    if(parameters.users) {
        query.user_id = {
            $in: parameters.users
        }
    }

    return _dbQuery(db, "latency", query)
}


/**
 * 
 * @param {MongoClient} db 
 * @param {Position} location 
 * @param {Number} maxDistance 
 */
exports.spaceQuery = (db, location, maxDistance=1000) => {
    _checkCollectionExist(db, "user_locations");

    const query = 
        {
            'location.coordinates': {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [
                            location.long,
                            location.lat
                        ]
                    },
                    $maxDistance: maxDistance
                }
            }
       }

    return _dbQuery(db, "user_locations", query)
}


/**
 * 
 * @param {MongoClient} db 
 * @param {object} parameters 
 */
exports.query = (db, parameters) => {

    if(Object.keys(parameters).length == 0) {
        return _dbQuery(db, "latency", {})
    }

    return this.spaceQuery(db, new Position(parameters.coordinates), parameters.maxDistance).then(
        (doc) => {
            const users = doc.map((elem) => elem.user_id)
            
            let params = structuredClone(parameters)
            params.users = users

            return this.timeQuery(db, params).then(
                    (docEnd) => {
                        docEnd.forEach((elem) => {
                            elem.location = doc.find((val) => val.user_id == elem.user_id).location
                    })
                    return docEnd
            })
    })
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////


const _dbQuery = (db, collection, selectors) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).find(selectors)
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