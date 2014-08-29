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

            if (!this.requireLogin('admin' + (area ? ('/' + area) : ''))) {
                return;
            }


            switch (area) {
            case 'posts':

                if (options.length === 0) {
                    React.renderComponent(new Posts({
                        onAddPostClicked: _.bind(exports._onAddPostClicked, this)
                    }), container);
                } else {
                    React.renderComponent(new Post({
                        id: options[0] === 'create' ? 0 : options[0],
                        editView: true,
                        onSaved: _.bind(exports._onPostSaved, this, options[0] === 'create')
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


        };

        exports._onAddPostClicked = function () {
            this.navigate('admin/posts/create', {
                trigger: true
            });
        };

        exports._onPostSaved = function (isCreate, post) {
            if (isCreate) {
                this.navigate('admin/posts/' + post.objectId, {
                    trigger: true
                });
            }
        };

        return exports;

    });