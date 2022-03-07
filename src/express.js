/* Imports */
var express = require('express'),
    bodyParser = require('body-parser');
    consign = require('consign');
    cors = require('cors');
    path = require('path');

/* Configure express */
var app = express();

/* Configure body-parser */
app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json());

/* Configure cors */
app.set('secret', 'api-nodejs');

/* configure consign */
consign()
    .include('./dist/main.js')
    .then('./src/routs')
    .then('./src/controllers')
    .into(app);

module.exports = app;