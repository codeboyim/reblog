var _ = require('underscore'),
    Backbone = require('backbone');



/**     
 * @module app/globals
 */


/** global observable */
module.exports.events = _.extend({}, Backbone.Events);

module.exports.broadcast = function () {
    this.events.trigger.apply(this.events, [].slice.apply(arguments));
};

module.exports.subscribe = function () {
    this.events.on.apply(this.events, [].slice.apply(arguments));
};

module.exports.unsubscribe = function () {
    this.events.off.apply(this.events, [].slice.apply(arguments));
};

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