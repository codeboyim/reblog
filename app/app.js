/**
 * @module app
 */

define(['require', 'backbone', 'underscore', 'parse', 'jquery', 'app/router', 'jsx!./views/header', 'events'], function (require, Backbone, _, Parse, $) {

    var dispatcher = require('events');
    /**
     * initialize app
     * @param {$=} container - jQuery element to append post views, default to <body>
     */
    function init() {

        Parse.initialize("yxD2tY5w6WEVJg2Dd8a566sUI6j1xGKHVOLzRkKl", "Ii4UZXR5rMGKmo5Og36lThmXcWnw3xyvN053kC4Z");

        require('jsx!./views/header').load();
        dispatcher.on('auth.statusChanged', function () {
            console.log(arguments[0]);
        });

    }


    /**
     * App APIs
     */
    return {
        init: init
    };
});