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
            'parse': 'https://www.parsecdn.com/js/parse-1.2.19.min'
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

    require(['jquery', 'app/post', 'backbone', 'moment', 'parse', 'underscore', 'jsx!_partials/header'],

        function($, post, Backbone, moment, Parse, _, header) {
            var dispatcher = _.clone(Backbone.Events);
            Parse.initialize("yxD2tY5w6WEVJg2Dd8a566sUI6j1xGKHVOLzRkKl", "Ii4UZXR5rMGKmo5Og36lThmXcWnw3xyvN053kC4Z");

            window.fbAsyncInit = function() {

                Parse.FacebookUtils.init({
                    appId: '880425675305915', // Facebook App ID
                    channelUrl: '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
                    cookie: true, // enable cookies to allow Parse to access the session
                    xfbml: false // parse XFBML
                });

                $(function() {
                    post.init($('#app_post'));

                    window.location.hash = 'posts';
                    Backbone.history.start({
                        pushState: false
                    });

                    header.load();
                });

                dispatcher.on('auth.statusChanged', function(authenticated) {
                    console.log('user logs in: ' + authenticated);
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

        });

})();