/**
 * @file Manages the HTTP routes of the query API
 * @author Ugo Balducci
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();

const queryController = require('../../controllers/api/queries')
const prepareArgs = require("../../middlewares/parametersPreparation")

router.get('/time/', prepareArgs, queryController.makeGlobalQuery)
router.get('/spatial/', prepareArgs, queryController.makeGlobalQuery)
router.get('/world/', prepareArgs, queryController.makeWorldQuery)
router.get('/user/', prepareArgs, queryController.makeUserIdQuery)
router.get('/stream/', prepareArgs, queryController.makeStreamIdQuery)

module.exports = router