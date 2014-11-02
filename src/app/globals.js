var _ = require('underscore'),
    Backbone = require('backbone');


/**     
 * @module app/exports
 */


/** global observable */
exports.events = _.extend({}, Backbone.Events);

exports.broadcast = function () {
    this.events.trigger.apply(this.events, [].slice.apply(arguments));
};

exports.subscribe = function () {
    this.events.on.apply(this.events, [].slice.apply(arguments));
};

exports.unsubscribe = function () {
    this.events.off.apply(this.events, [].slice.apply(arguments));
};

/** @const */
exports.EVENT = {
    authStatusChanged: 'auth.statusChanged',
    viewLoaded: 'view.loaded',
    viewUnloaded: 'view.unloaded'
};

/** @const */
exports.SETTINGS = {
    datetimepicker: {
        format: 'L H:mm',
        formatDate: 'L',
        formatTime: 'H:mm',
        defaultDate: new Date()
    },

};

exports.locale = 'en-au';