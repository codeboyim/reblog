define(['underscore', 'backbone'], function(_, Backbone) {
    /**     
     * @module app/globals
     */

    var exports = {};

    /** global observable */
    exports.dispatcher = _.extend({}, Backbone.Events);

    /** @const */
    exports.EVENT = {
        authStatusChanged: 'auth.statusCHanged'
    }

    return exports;
});