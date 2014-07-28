define(['underscore', 'backbone'], function(_, Backbone) {
    /**     
     * @module app/globals
     */

    var exports = {};

    /** global observable */
    exports.events = _.extend({}, Backbone.Events);

    /** @const */
    exports.EVENT = {
        authStatusChanged: 'auth.statusChanged',
        authLoggedIn: 'auth.loggedIn',
        authLoggedOut: 'auth.loggedOut',
        viewLoaded: 'view.loaded',
        viewUnloaded: 'view.unloaded'
    };

    return exports;
});