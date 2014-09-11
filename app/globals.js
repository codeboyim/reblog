var _ = require('underscore'),
    Backbone = require('backbone');



/**     
 * @module app/globals
 */


/** global observable */
module.exports.events = _.extend({}, Backbone.Events);

/** @const */
module.exports.EVENT = {
    authStatusChanged: 'auth.statusChanged',
    viewLoaded: 'view.loaded',
    viewUnloaded: 'view.unloaded'
};

/** @const */
module.exports.SETTINGS = {
    datetimepicker: {
        format: 'L H:mm',
        formatDate: 'L',
        formatTime: 'H:mm',
        defaultDate: new Date()
    },
    moment: {
        locale: 'en-au'
    }
};