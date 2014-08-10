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

    };


    return exports;
});