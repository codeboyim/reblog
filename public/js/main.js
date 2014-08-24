(function () {
    'use strcit';

    var root = '../../',
        vendors = root + 'lib/vendors/';

    require.config({
        baseUrl: root + 'app',
        paths: {
            'backbone': vendors + 'backbone/backbone',
            'underscore': vendors + 'underscore/underscore',
            'jquery': vendors + 'jquery/dist/jquery',
            'text': vendors + 'text/text',
            'jsx': vendors + 'jsx/js/jsx',
            'JSXTransformer': vendors + 'jsx/js/JSXTransformer-0.11.1',
            'react': vendors + 'react/react',
            'markdown': vendors + 'markdown/dist/markdown',
            'parse': '//www.parsecdn.com/js/parse-1.2.19.min',
            'datetimepicker': vendors + 'datetimepicker/jquery.datetimepicker',
            '_datetimepicker': '../lib/datetimepicker',
            '_moment': '../lib/moment'
        },

        shim: {
            'parse': {
                exports: 'Parse'
            },
            'markdown': {
                exports: 'markdown'
            },
            'datetimepicker': ['jquery']
        },

        packages: [
            {
                'name': 'moment',
                'main': 'moment',
                'location': vendors + 'moment'
            },
            {
                'name': 'modal',
                'location': root + 'lib/modal'
            },
            {
                'name': 'admin',
                'location': root + 'app/admin'
            }

        ],

        jsx: {
            fileExtension: '.jsx'
        }

    });

    require(['parse'], function (Parse) {

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


    });

    require(['app'], function (App) {

        //kick-off the app
        new App();

    });




})();