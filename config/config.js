var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var baseApp = {
  root: rootPath,
  app: {
    name: 'a11yapp'
  },
  port: 3000,
};

var config = {
  development: baseApp,
  test: baseApp,
  production: baseApp
};

module.exports = config[env];
