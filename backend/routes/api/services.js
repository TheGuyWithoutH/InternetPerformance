/**
 * @file Manages the HTTP routes of the frontend app
 * @author Ugo Balducci
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();

const servicesController = require('../../controllers/api/services')
const prepareArgs = require("../../middlewares/parametersPreparation")
 
router.get('/timeframe/', prepareArgs, servicesController.timeframeQuery)
router.get('/table/', prepareArgs, servicesController.tableQuery)
 
module.exports = router