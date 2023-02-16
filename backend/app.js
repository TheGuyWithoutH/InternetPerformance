/**
 * @file Express App declaration
 * @author Ugo Balducci
 * @version 1.0.0
 */

const express = require('express');
const path = require('node:path');
const { createClient } = require('./configs/cache.config')

const queryRouter = require('./routes/api/queries')
const servicesRouter = require('./routes/api/services')
const searchRouter = require('./routes/api/search')

//Set up express app
const app = express();

//Open cache connection
if (!process.env.CACHING || process.env.CACHING === 'on') {
  createClient()
}

const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build');

// JSON pretty print
app.set('json spaces', 3);

// Set up CORS
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

// Serve static files from the React app
app.use(express.static(CLIENT_BUILD_PATH));

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