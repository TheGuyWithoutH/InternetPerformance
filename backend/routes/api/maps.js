/**
 * @file Manages the HTTP routes of the maps
 * @author Ugo Balducci
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
 
router.use(express.static('static/maps'));
 
module.exports = router