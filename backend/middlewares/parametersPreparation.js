/**
 * @file Middleware to prepare arguments for the query
 * @author Ugo Balducci
 * @version 1.0.0
 */

const {Request, Response, NextFunction} = require('express')
const parseDate = require("../utils/parseDate")

/**
 * Middleware that finds request arguments to reformat them for queries.
 * @param {Request} req The HTTP request received
 * @param {Response} res The HTTP response that will be sent back
 * @param {NextFunction} next The next middleware/controller to execute
 */
module.exports = (req, res, next) => {
    try{
        if(req.query.coordinates) req.query.coordinates = req.query.coordinates.split(",").map((str) => parseFloat(str))
    
        if(req.query.maxDistance) req.query.maxDistance = parseInt(req.query.maxDistance)
    
        if(req.query.from) {
            req.query.from = parseDate(req.query.from)
        }
    
        if(req.query.to) {
            req.query.to = parseDate(req.query.to)
        }

        if(req.query.streamId && req.query.streamId === "on") {
            req.query.streamId = true
        } else {
            req.query.streamId = false
        }

        if(req.query.latencyOnly && req.query.latencyOnly === "on") {
            req.query.latencyOnly = true
        } else {
            req.query.latencyOnly = false
        }
    
        next()
    } catch(error) {
        res.status(401).json({ error });
    }
}