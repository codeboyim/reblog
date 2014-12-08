var packageInfo = require('../../package.json');
require('./styles/app.scss');
Parse.initialize(packageInfo.parse.applicationId, packageInfo.parse.javascriptKey);
require('router');
