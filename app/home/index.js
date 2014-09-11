var React = require('react'),
    Home = require('./view');

module.exports = function () {

    React.renderComponent(Home(), document.getElementById('site-content'));

};