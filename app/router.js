    define(['require', 'backbone', 'underscore', 'parse', 'globals', 'loginController', 'admin/adminController', 'homeController'],
        function (require, Backbone, _, Parse, globals) {

            /** 
             *@module post/router
             */

            var exports = Backbone.Router.extend(
                /** @lends Router.prototype */
                {

                    routes: {
                        '': 'home',
                        'posts/create': 'posts',
                        'posts/:id': 'posts',
                        'posts/:id/:action': 'posts',

                        'admin': 'admin',
                        'admin/:area': 'admin',

                        'login?returnUrl=:returnUrl': 'login',
                        'login': 'login'
                    },

                    home: require('homeController'),

                    admin: require('admin/adminController'),

                    login: require('loginController'),

                    requireLogin: function (returnUrl) {

                        if (!Parse.User.current()) {
                            this.navigate('login?returnUrl=' + encodeURIComponent(returnUrl), {
                                trigger: true
                            });
                            return false;
                        } else {
                            return true;
                        }
                    },

                    /** @constructs */
                    initialize: function (options) {
                        _.bindAll(this, '_authStatusChanged');

                        this.listenTo(globals.events, globals.EVENT.authStatusChanged, this._authStatusChanged);
                        this.route('admin/posts/:id', _.bind(this.admin, this, 'posts'));
                    },


                    _authStatusChanged: function (authenticated) {

                        if (!authenticated) {
                            this.navigate('', {
                                trigger: true
                            });
                        }

                    }


                });

            return exports;
        });