var express = require('express');
var a11y = require('a11y');
var validator = require('valid-url');
var router = express.Router();
var Article = require('../models/article');
var Result = require('../models/result');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  // public/index.html
  res.send(index.html);
});

router.get('/help', function (req, res, next) {
  var articles = [new Article(), new Article()];
  res.render('help', {
    title: 'Please see the docs for further help', // TODO
    articles: articles
  });
});

router.post('/api', function (req, res) {
  var url = req.body.url;
  if (validator.isUri(url)) {
    var response = "";
    a11y(url, function (err, reports) {
      if (err) {
        response = 'There was an error: ' + err;
        return;
      }
      response = reports;
      res.json(response);
    });
  } else {
    res.send({
      error: 'Invalid URL supplied. Please supply a valid URL and try again.'
    });
  }
});
