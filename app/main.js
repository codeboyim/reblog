/* jshint esnext: true */

var Router = require('./router');

require('./styles/app.css');


Parse.initialize("nL7qxG42xhdthyxFTgfPz7yjbm5up7O9abWx7EdN", "ZP02hz8DuVh9cBhA7aZ8AjFTirh95j9kQHSBZrN2");

window.fbAsyncInit = function () {
    Parse.FacebookUtils.init({
        appId: '880425675305915', // Facebook App ID
        channelUrl: '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
        cookie: true, // enable cookies to allow Parse to access the session
        xfbml: false // parse XFBML
    });

};

new Router();

Backbone.history.start({
    pushState: false
});

if (Parse.User.current()) {
    (new Parse.Query(Parse.Role)).equalTo('users', Parse.User.current()).first().done((u)=>{

        if (u) {
            Parse.User.current().admin = true;
            globals.broadcast(globals.EVENT.authStatusChanged, true);
        }

    });
}