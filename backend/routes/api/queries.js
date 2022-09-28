const express = require('express');
const router = express.Router();

const queryController = require('../../controllers/api/queries')

router.get('/', queryController.makeQuery)

module.exports = router