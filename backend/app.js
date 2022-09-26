/**
 * @file Express App declaration
 * @author Ugo Balducci
 * @version 1.0.0
 */

const express = require('express');
const connection = require('./configurations/dbConfigurations')
const path = require('path');

const app = express();
const db = connection()

app.get('/api/', (req, res, next) => {
    db.collection('latency').findOne().then((doc) =>
        res.status(200).json(doc)
    ).catch((error) => {
        res.status(400).json({
          error: error
        });
    })
})

module.exports = app;