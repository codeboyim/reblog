define(['underscore', 'backbone'], function (_, Backbone) {
    'use strict';
    /**     
     * @module app/globals
     */

    var exports = {},
        locale = 'en-au';

    /** global observable */
    exports.events = _.extend({}, Backbone.Events);

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
        moment: {
            locale: locale
        }
    };

    return exports;
});