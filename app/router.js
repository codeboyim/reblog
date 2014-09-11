var Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse');


module.exports = Backbone.Router.extend(
    /** @lends Router.prototype */
    {

        routes: {
            '': 'home',
            'posts/create': 'posts',
            'posts/:id': 'posts',
            'posts/:id/:action': 'posts',

            'admin(/)': 'admin',
            'admin/:area(/)': 'admin',

            'login?returnUrl=:returnUrl': 'login',
            'login': 'login'
        },

        home: require('./home'),

        /** @constructs */
        initialize: function (options) {}

    });