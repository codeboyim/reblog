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

                    /**
                     * load views
                     * @param {String} name - view name to load
                     * @param {object=} options - hash object passed to view initialize function
                     * @return {object} view
                     */
                    load: function (name, options) {
                        var v = this._views[name];

                        if (options.container) {
                            _.each(this._views, function (_v, k) {

                                if (_v && v !== _v && options.container === _v.container) {
                                    this.unload(k);
                                }

                            }, this);
                        }

                        if (!v) {
                            v = require(this._viewPaths + name);
                            v = new v(_.extend({
                                router: this
                            }, options));
                            this._views[name] = v;
                        }

                        return this._views[name];
                    },

                    /**
                     * unload views
                     * @param {String} name - view name to unload
                     */
                    unload: function (name) {
                        var v = this._views[name];

                        if (v && _.isFunction(v.unload)) {
                            v.unload();
                        }

                        this._views[name] = null;

                    },

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
                        _.bindAll(this, '_authStatusChanged', '_viewUnloaded');
                        /** @private */
                        this._views = {};
                        /** @private */
                        this._viewPaths = 'views/';

                        this.listenTo(globals.events, globals.EVENT.authStatusChanged, this._authStatusChanged)
                            .listenTo(globals.events, globals.EVENT.viewUnloaded, this._viewUnloaded);

                    },


                    /** @private */
                    _viewUnloaded: function (view) {
                        var self = this;

                        _.find(this._views, function (v, k) {

                            if (v === view) {
                                self._views[k] = null;
                                return false;
                            }

                        });
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