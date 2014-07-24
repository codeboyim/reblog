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
        require('jsx!./views/header').load();
    }


    /**
     * App APIs
     */
    return {
        init: init
    };
});