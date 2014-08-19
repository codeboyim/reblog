define(['react', 'parse', 'globals', 'models/Post', 'jsx!./views/admin'], function (React, Parse, globals, Post, Admin) {
    /**
     * @module app/admin
     */

    /**
     * @constructor
     * @param {string} area - section name, e.g. posts, users, prefs etc.
     *        {...*}  args - other arguments passed by hash fragment
     */
    var exports = function (area) {
        var options;

        if (!this.requireLogin('admin' + (area ? ('/' + area) : ''))) {
            return;
        }

        if (arguments.length > 1) {

            switch (area) {
            case 'posts':
                options = {
                    id: arguments[1]
                };
                break;
            default:
                break;
            }

        }

        React.renderComponent(Admin({
            area: area,
            options: options
        }), document.getElementById('site-content'));




    };


    return exports;
});