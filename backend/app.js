/**
 * @file Express App declaration
 * @author Ugo Balducci
 * @version 1.0.0
 */

const express = require('express');

const app = express();

const queryRouter = require('./routes/api/queries')

app.use('/api/query', queryRouter)



module.exports = app;