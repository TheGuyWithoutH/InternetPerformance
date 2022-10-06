/**
 * @file Express App declaration
 * @author Ugo Balducci
 * @version 1.0.0
 */

const express = require('express');

const app = express();

const queryRouter = require('./routes/api/queries')

app.set('json spaces', 3);

app.use('/api/query', queryRouter)



module.exports = app;