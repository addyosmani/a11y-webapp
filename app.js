var express = require('express');
var config = require('./config/config');
var bodyParser = require('body-parser');
var app = express();

require('./config/express')(app, config);

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000);
