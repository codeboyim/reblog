define(['require', 'backbone', 'underscore', 'parse', './router', './views/header'], function(require, Backbone, _, Parse, Router) {

    /**
     * @module app
     */

    /**
     * @constructor
     */
    var exports = function() {
        var Header = require('./views/header');

        new Header({
            container: document.getElementById('site-header')
        });
        new Router();

        Backbone.history.start({
            pushState: false
        });
    };

    return exports;
});