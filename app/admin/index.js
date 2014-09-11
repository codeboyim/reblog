/** @jsx React.DOM */
// jshint ignore: start

var Layout = require('./views/_layout'),
    Home = require('./views/home'),
    React = require('react');

module.exports = function (area, arg1) {

    React.renderComponent(<Layout><Home/></Layout>, document.getElementById('site-content'));
    
};