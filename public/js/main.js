(function() {
    var root = '../../',
        vendors = root + 'lib/vendors/';

    require.config({
        paths: {
            'app': root + 'app',
            'backbone': vendors + 'backbone/backbone',
            'underscore': vendors + 'underscore/underscore',
            'jquery': vendors + 'jquery/dist/jquery',
            'text': vendors + 'text/text',
            'jsx': vendors + 'jsx/js/jsx',
            'JSXTransformer': vendors + 'jsx/js/JSXTransformer-0.10.0',
            'react': vendors + 'react/react',
            'moment': vendors + 'moment/moment',
            'parse': '//www.parsecdn.com/js/parse-1.2.19.min',
            'events': root + 'app/events'
        },

        shim: {
            'parse': {
                exports: 'Parse'
            }
        },

        jsx: {
            fileExtension: '.jsx'
        }

    });

    require(['parse'], function(Parse) {
        window.fbAsyncInit = function() {

            Parse.FacebookUtils.init({
                appId: '880425675305915', // Facebook App ID
                channelUrl: '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
                cookie: true, // enable cookies to allow Parse to access the session
                xfbml: false // parse XFBML
            });

        };

        (function(d, s, id) {
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

    });

    require(['jquery', 'app/app'],

        function($, App) {

            $(function() {
                new App();
            });

        });

})();