/**
 * @file Express App declaration
 * @author Ugo Balducci
 * @version 1.0.0
 */

const express = require('express');
const path = require('node:path');
const { createClient } = require('./configs/cache.config')

const app = express();

//Open cache connection
if (!process.env.CACHING || process.env.CACHING === 'on') {
  createClient()
}


const queryRouter = require('./routes/api/queries')
const servicesRouter = require('./routes/api/services')
const searchRouter = require('./routes/api/search')

const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build');

app.set('json spaces', 3);

app.use(express.static(CLIENT_BUILD_PATH));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

// API Routes
app.use('/api/query', queryRouter)
app.use('/api/services', servicesRouter)
app.use('/api/search', searchRouter)

if (process.env.NODE_ENV === 'production') {
  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
  });
}

module.exports = app;