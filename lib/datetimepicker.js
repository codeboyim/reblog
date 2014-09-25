var datetimepicker = require('vendors/datetimepicker/jquery.datetimepicker'),
    moment = require('moment');

require('vendors/datetimepicker/jquery.datetimepicker.css');

Date.parseDate = function (input, format) {
    if (!input) {
        return moment();
    } else {
        return moment(input, format).toDate();
    }
};

Date.prototype.dateFormat = function (format) {
    return moment(this).format(format);
};