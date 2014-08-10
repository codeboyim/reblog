define(['backbone', 'underscore', 'react', 'parse', 'globals', 'models/PostCollection', 'jsx!views/home'], function (Backbone, _, React, Parse, globals, PostCollection, Home) {
    /**
     * @module
     */

    /**
     * @constructor
     * @this router
     */
    var exports = function () {
        var posts = new PostCollection();

        React.renderComponent(Home({
            posts: posts
        }), document.getElementById('site-content'));
        
        posts.fetch();
    };

    return exports;
});