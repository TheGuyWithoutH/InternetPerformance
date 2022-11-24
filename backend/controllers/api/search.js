/**
 * @file
 * @author Ugo Balducci
 * @version 1.0.0
 */

const express = require('express');
const {query, queryTypes} = require('../../services/api/dbQuery');


const db = dbConnect()

exports.makeSearch = (req, res, next) => {
    query(db, req.query, queryTypes.SEARCH).then((doc) => {
        res.status(200).json(doc)
    }).catch((error) => {
        res.status(400).json(error)
    })
}