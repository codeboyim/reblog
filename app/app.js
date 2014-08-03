define(['require', 'backbone', 'underscore', 'parse', './router', './views/headerNav'], function(require, Backbone, _, Parse, Router) {

    /**
     * @module app
     */

    /**
     * @constructor
     */
    var exports = function() {
        var HeaderNav = require('./views/headerNav');

        new HeaderNav({
            container: document.getElementById('header-nav')
        });
        new Router();

        Backbone.history.start({
            pushState: false
        });
    };

    return exports;
});