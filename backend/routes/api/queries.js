/**
 * @file
 * @author Ugo Balducci
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();

const queryController = require('../../controllers/api/queries')
const prepareArgs = require("../../middlewares/parametersPreparation")

router.get('/time/', prepareArgs, queryController.makeGlobalQuery)
router.get('/spatial/', prepareArgs, queryController.makeGlobalQuery)
router.get('/user/', queryController.makeUserIdQuery)
router.get('/stream/', queryController.makeStreamIdQuery)

module.exports = router