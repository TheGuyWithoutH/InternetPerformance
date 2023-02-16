/**
 * @file Manages the HTTP routes of the API
 * @author Ugo Balducci
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();

const queryController = require('../../controllers/api/queries')
const prepareArgs = require("../../middlewares/parametersPreparation")
const preparePags = require("../../middlewares/paginationPreparation")

router.get('/time/', preparePags, prepareArgs, queryController.makeGlobalQuery)
router.get('/spatial/', preparePags, prepareArgs, queryController.makeGlobalQuery)
router.get('/world/', preparePags, queryController.makeWorldQuery)
router.get('/user/', preparePags, queryController.makeUserIdQuery)
router.get('/stream/', preparePags, queryController.makeStreamIdQuery)
router.get("/recent/", queryController.makeRecentQuery)

module.exports = router