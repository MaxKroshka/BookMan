var express = require('express');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var path = require('path');
var app = express();

mongoose.connect('mongodb://localhost/bookman');

app.use(favicon(path.join(__dirname, '../client/assets/favicon.ico')));
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.listen(8000);

module.exports = app;
