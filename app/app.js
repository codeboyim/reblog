/**
 * @module app
 */

define(['require', 'backbone', 'underscore', 'parse', './router', './views/header', 'events'], function(require, Backbone, _, Parse, Router) {

    /**
     * initialize app
     * @param {$=} container - jQuery element to append post views, default to <body>
     */
    var exports = function() {
        var Header = require('./views/header');
        
        (new Header()).render();
        new Router();
        window.location.hash = 'posts';
        
        Backbone.history.start({
            pushState: false
        });
    };

    return exports;
});