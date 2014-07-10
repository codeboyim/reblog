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
        },

        jsx: {
            fileExtension: '.jsx'
        }

    });

    require(['jquery', 'app/post'],

        function($, post) {
            post.init($('#posts'));
            post.load('list');
        });

})();