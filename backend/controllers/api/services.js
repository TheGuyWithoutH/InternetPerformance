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


const db = dbConnect()


/**
 * Controller for queries of the user interface for timeframes of latencies
 * @param {Request} req The HTTP request received
 * @param {Response} res The HTTP response that will be sent back
 * @param {NextFunction} next The next middleware/controller to execute
 */
exports.timeframeQuery = (req, res, next) => {
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
    
    query(db, req.query, queryType).then((result) => {
        result.forEach(element => {
            element.user_count = new Set(element.users).size
            delete element.users
        });

        res.status(200).json(result)
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