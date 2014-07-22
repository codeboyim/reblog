(function () {
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
        
        shim:{
            'parse':{
                exports:'Parse'
            }
        },

        jsx: {
            fileExtension: '.jsx'
        }

    });

    require(['jquery', 'app/post', 'backbone', 'moment', 'parse'],

        function ($, post, Backbone, moment, Parse) {

            Parse.initialize("yxD2tY5w6WEVJg2Dd8a566sUI6j1xGKHVOLzRkKl", "Ii4UZXR5rMGKmo5Og36lThmXcWnw3xyvN053kC4Z");
            

            $(function () {
                post.init($('#app_post'));

                window.location.hash = 'posts';
                Backbone.history.start({
                    pushState: false
                });


            });
        });

})();