/**
 * @file
 * @author Ugo Balducci
 * @version 1.0.0
 */

const express = require('express');
const {query, queryTypes} = require('../../services/api/dbQuery');
const { dbConnect } = require('../../configs/db.config');


const db = dbConnect()

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


exports.makeSearch = (req, res, next) => {
    query(db, req.query, queryTypes.SEARCH).then((doc) => {
        res.status(200).json(doc)
    }).catch((error) => {
        res.status(400).json(error)
    })
}