/**
 * @file
 * @author Ugo Balducci
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();

const searchController = require('../../controllers/api/search');
const prepareArgs = require("../../middlewares/parametersPreparation")

router.get('/world', searchController.worldMap)

router.get('/locations', prepareArgs, searchController.makeSearch)

module.exports = router