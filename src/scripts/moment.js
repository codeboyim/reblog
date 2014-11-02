var moment = require('./vendors/moment/moment.js'),
    globals = require('globals');
//    locale = require('vendors/moment/locale/' + globals.locale);

moment.locale(globals.locale);

module.exports = moment;