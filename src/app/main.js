/* jshint esnext: true */
Parse.initialize('yxD2tY5w6WEVJg2Dd8a566sUI6j1xGKHVOLzRkKl', 'Ii4UZXR5rMGKmo5Og36lThmXcWnw3xyvN053kC4Z');

window.fbAsyncInit = function () {
    Parse.FacebookUtils.init({
        appId: '880425675305915', // Facebook App ID
        cookie: true, // enable cookies to allow Parse to access the session
        xfbml: false // parse XFBML
    });

};

if (Parse.User.current()) {
    (new Parse.Query(Parse.Role)).equalTo('users', Parse.User.current()).first().done((u)=>{

        if (u) {
            Parse.User.current().admin = true;
        }

    });
}

var director = require('director');

router = director.Router({
    '/':function(){
        console.log('home');
    }
});

router.init();