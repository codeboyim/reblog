define(['react', 'parse', 'globals', 'models/Post', 'jsx!./views/admin'], function (React, Parse, globals, Post, Admin) {
    /**
     * @module app/admin
     */

    /**
     * @constructor
     * @param {object} options
     *        {Element} options.container
     */
    var exports = function (area) {

        if (!this.requireLogin('admin' + (area ? ('/' + area) : ''))) {
            return;
        }

        React.renderComponent(Admin({
            area: area
        }), document.getElementById('site-content'));


        if (arguments.length > 1) {
            if (area === 'posts') {
                (new Post({id:arguments[1]})).fetch().done(function(post){});
            }
        }

    };


    return exports;
});