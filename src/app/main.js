/* jshint esnext: true */
require('normalize.css/normalize.css')
require('./styles/app.scss');

Parse.initialize('yxD2tY5w6WEVJg2Dd8a566sUI6j1xGKHVOLzRkKl', 'Ii4UZXR5rMGKmo5Og36lThmXcWnw3xyvN053kC4Z');

window.fbAsyncInit = () => {

    Parse.FacebookUtils.init({
        appId: '880425675305915', // Facebook App ID
        cookie: true, // enable cookies to allow Parse to access the session
        xfbml: false // parse XFBML
    });

};

require('router');
