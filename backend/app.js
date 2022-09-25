const express = require('express');
const mongoose = require('mongoose');
const connection = require('./configurations/dbConfigurations')

const path = require('path');

const app = express();

connection();

module.exports = app;