/**
 * @file Controller for the search queries of the service API
 * @author Ugo Balducci
 * @version 1.0.0
 */

const express = require('express');
const {query, queryTypes} = require('../../services/api/dbQuery');
const { dbConnect } = require('../../configs/db.config');


const db = dbConnect()

/**
 * Controller for world map queries.
 * @param {Request} req The HTTP request received
 * @param {Response} res The HTTP response that will be sent back
 * @param {NextFunction} next The next middleware/controller to execute
 */
exports.worldMap = (req, res, next) => {
    query(db, {featureCode: "P", additionalInfo: true}, queryTypes.SEARCH).then((doc) => {
        const result = {
            "type": "FeatureCollection",
            "features": doc.map(elem => {
                elem.type = "Feature"
                return elem
            })
        }

        res.status(200).json(result)
    }).catch((error) => {
        res.status(400).json(error)
    })
}

/**
 * Controller for location search queries.
 * @param {Request} req The HTTP request received
 * @param {Response} res The HTTP response that will be sent back
 * @param {NextFunction} next The next middleware/controller to execute
 */
exports.makeSearch = (req, res, next) => {
    query(db, req.query, queryTypes.SEARCH).then((doc) => {
        res.status(200).json(doc)
    }).catch((error) => {
        res.status(400).json(error)
    })
}