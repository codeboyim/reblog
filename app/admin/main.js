define(['underscore', 'backbone', 'react', 'parse', 'globals',
        'jsx!./views/home', 'jsx!./views/posts', 'jsx!./views/post', 'jsx!./views/prefs', 'jsx!./views/users'],
    function (_, Backbone, React, Parse, globals, Home, Posts, Post, Prefs, Users) {
        'use strict';
        /**
         * @module app/admin
         */

        /**
         * @constructor
         * @param {string} area - section name, e.g. posts, users, prefs etc.
         *        {...*}  args - other arguments passed by hash fragment
         */
        var exports = function (area) {
            var options = _.compact([].slice.apply(arguments, [1])),
                container = document.getElementById('site-content');

            _.extend(this, Backbone.Events);

            if (!this.requireLogin('admin' + (area ? ('/' + area) : ''))) {
                return;
            }

            if (arguments.length > 1) {

                switch (area) {
                case 'posts':

                    if (options.length === 0) {
                        React.renderComponent(new Posts(), container);
                    } else {
                        React.renderComponent(new Post({
                            id: options[0],
                            editView: true
                        }), container);
                    }

                    break;

                case 'prefs':
                    React.renderComponent(new Prefs(), container);
                    break;

                case 'users':
                    React.renderComponent(new Users(), container);

                    break;

                default:
                    React.renderComponent(new Home(), container);
                    break;
                }

            }


        };

        return exports;

    });