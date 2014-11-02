define(['backbone', 'underscore', 'react', 'parse', 'globals', 'router', 'jsx!views/headerNav'], function (Backbone, _, React, Parse, globals, Router, HeaderNav) {

    /**
     * @module app
     */

    /**
     * @constructor
     */
    var exports = function () {
        _.extend(this, Backbone.Events);

        this._router = new Router();

        React.renderComponent(HeaderNav(), document.getElementById('header-nav'));

        Backbone.history.start({
            pushState: false
        });

        if (Parse.User.current()) {
            (new Parse.Query(Parse.Role)).equalTo('users', Parse.User.current()).first().done(_.bind(function (u) {

                if (u) {
                    Parse.User.current().admin = true;
                    globals.events.trigger(globals.EVENT.authStatusChanged, true);
                }

            }, this));
        }
    };


    return exports;
});