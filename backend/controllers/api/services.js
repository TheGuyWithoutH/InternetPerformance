/**
 * @file Controllers for the API services for frontend
 * @author Ugo Balducci
 * @version 1.0.0
 */

const {Request, Response, NextFunction} = require('express')
const assert = require('node:assert').strict;
const {query, queryTypes} = require('../../services/api/dbQuery');
const { range } = require('../../utils/numbers');
const { dbConnect } = require('../../configs/db.config');
const { saveTimeFrameInCache, getTimeFrameFromCache } = require('../../services/cache/cacheQuery');
const { extractLocationQuery } = require('../../utils/location');
const parseDate = require('../../utils/parseDate');


const db = dbConnect()


/**
 * Controller for queries of the user interface for timeframes of latencies
 * @param {Request} req The HTTP request received
 * @param {Response} res The HTTP response that will be sent back
 * @param {NextFunction} next The next middleware/controller to execute
 */
exports.timeframeQuery = async (req, res, next) => {
    const queryType = queryTypes.TIMEFRAME;

    try {
        assert(req.query.from && req.query.to && req.query.frame, Error("Arguments wrongly formatted : missing arguments"))
        assert((req.query.to - req.query.from) % req.query.frame === 0, Error("Arguments wrongly formatted : timeframe not coherent"))
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
        return;
    }

    req.query.boundaries = range(req.query.from.valueOf() / 1000, req.query.to.valueOf() / 1000, req.query.frame)

    //Get the data from the cache
    let cachedData = []

    //Forward pass to get the data from the cache
    while (req.query.boundaries.length > 1) {
        const cached = await getTimeFrameFromCache(req.query.boundaries[0], req.query.boundaries[1], extractLocationQuery(req.query))
        if (cached) {
            cachedData.push(cached)
            req.query.boundaries.shift()
        } else {
            break
        }
    }

    //Backward pass to get the data from the cache
    while (req.query.boundaries.length > 1) {
        const cached = await getTimeFrameFromCache(req.query.boundaries[req.query.boundaries.length - 2], req.query.boundaries[req.query.boundaries.length - 1], extractLocationQuery(req.query))
        if (cached) {
            cachedData.push(cached)
            req.query.boundaries.pop()
        } else {
            break
        }
    }

    if(req.query.boundaries.length <= 1) {
        res.status(200).json(cachedData.sort((a, b) => a.from - b.from))
        return
    } else if (cachedData.length > 0) {
        req.query.from = parseDate(req.query.boundaries[0].toString())
        req.query.to = parseDate(req.query.boundaries[req.query.boundaries.length - 1].toString())
    }
    
    query(db, req.query, queryType).then((result) => {
        result.forEach(element => {
            element.user_count = new Set(element.users).size
            delete element.users
        });

        result = cachedData.length > 0 ? result.concat(cachedData).sort((a, b) => a.from - b.from) : result

        res.status(200).json(result)

        result.forEach(element => {
            saveTimeFrameInCache(element, extractLocationQuery(req.query))
        })
    }).catch((error) => {
        console.log(error)
        res.status(400).json({
            error: error.message
        });
    })
}


/**
 * Controller for queries of the user interface for the view table of latencies
 * @param {Request} req The HTTP request received
 * @param {Response} res The HTTP response that will be sent back
 * @param {NextFunction} next The next middleware/controller to execute
*/
exports.tableQuery = (req, res, next) => {
    const queryType = queryTypes.TABLE;

    query(db, req.query, queryType).then((result) => {
        res.status(200).json(result)
    }).catch((error) => {
        console.log(error)
        res.status(400).json({
            error: error
        });
    })
}