var React = require('react'),
    Home = require('./home');

module.exports = function () {

    React.renderComponent(Home(), document.getElementById('site-content'));

}