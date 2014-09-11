var Parse = require('parse'),
    router = require('./router'),
    Backbone = require('backbone'),
    React = require('react'),
    _ = require('underscore'),
    globals = require('./globals');


window.fbAsyncInit = function () {

    Parse.FacebookUtils.init({
        appId: '880425675305915', // Facebook App ID
        channelUrl: '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
        cookie: true, // enable cookies to allow Parse to access the session
        xfbml: false // parse XFBML
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

Parse.initialize("yxD2tY5w6WEVJg2Dd8a566sUI6j1xGKHVOLzRkKl", "Ii4UZXR5rMGKmo5Og36lThmXcWnw3xyvN053kC4Z");

new router();

Backbone.history.start({
    pushState: false
});

React.renderComponent(require('./views/headerNav')(), document.getElementById('header-nav'));

if (Parse.User.current()) {
    (new Parse.Query(Parse.Role)).equalTo('users', Parse.User.current()).first().done(_.bind(function (u) {

        if (u) {
            Parse.User.current().admin = true;
            globals.broadcast(globals.EVENT.authStatusChanged, true);
        }

    }, this));
}