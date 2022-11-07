/**
 * @file Express App declaration
 * @author Ugo Balducci
 * @version 1.0.0
 */

const express = require('express');

const app = express();

const queryRouter = require('./routes/api/queries')
const mapRouter = require('./routes/api/maps')

app.set('json spaces', 3);

app.use('/api/query', queryRouter)
app.use('/api/maps', mapRouter)



module.exports = app;