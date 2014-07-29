    define(['require', 'backbone', 'underscore', 'parse', 'globals', './views/list', './views/post', './views/login', './views/admin'],
        function(require, Backbone, _, Parse, globals) {

            /** 
             *@module post/router
             */

            var exports = Backbone.Router.extend(
                /** @lends Router.prototype */
                {

                    routes: {
                        '': 'posts',
                        'posts': 'posts',
                        'posts/create': 'posts',
                        'posts/:id': 'posts',
                        'posts/:id/:action': 'posts',

                        'admin': 'admin',
                        'admin/:area': 'admin',

                        'login?returnUrl=:returnUrl': 'login',
                        'login': 'login'
                    },

                    posts: function() {
                        var view,
                            id,
                            action;

                        if ((arguments[0] === null || arguments[0] === undefined) && (arguments[1] === null || arguments[1] === undefined)) {

                            this.load('list', {
                                container: document.getElementById('site-content')
                            }).posts.fetch().then(null, function(posts, error) {
                                console.error(error);
                            });

                        } else {

                            if (!Parse.User.current()) {
                                this.navigate('login?returnUrl=' + encodeURIComponent(window.location.hash), {
                                    trigger: true
                                });
                                return;
                            }

                            if (arguments[0] === 'create') {

                                this.load('post', {
                                    container: document.getElementById('site-content')
                                }).render();

                            } else {
                                id = arguments[0];
                                action = arguments[1];

                                view = this.load('post', {
                                    container: document.getElementById('site-content')
                                });

                                view.post.id = id;

                                if (action === 'edit') {
                                    view.post.fetch().then(function(p) {}, function(p, error) {
                                        console.error(error);
                                    });
                                }
                            }
                        }
                    },


                    admin: function(area) {

                        if (!Parse.User.current()) {
                            this.navigate('login?returnUrl=admin' + (area ? ('/' + area) : ''), {
                                trigger: true
                            });
                            return;
                        } else {
                            this.load('admin', {
                                container: document.getElementById('site-content')
                            }).setArea(area);
                        }

                    },

                    login: function(returnUrl) {
                        var self = this;

                        if (Parse.User.current()) {
                            this.navigate(returnUrl || '', {
                                trigger: true
                            });
                        } else {
                            this.load('login', {
                                container: document.getElementById('site-content'),
                                returnUrl: returnUrl
                            });
                        }
                    },

                    /**
                     * load views
                     * @param {String} name - view name to load
                     * @param {object=} options - hash object passed to view initialize function
                     * @return {object} view
                     */
                    load: function(name, options) {
                        var v = this._views[name];

                        if (options.container) {
                            _.each(this._views, function(_v, k) {

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
                    unload: function(name) {
                        var v = this._views[name];

                        if (v && _.isFunction(v.unload)) {
                            v.unload();
                        }

                        this._views[name] = null;

                    },

                    /** @constructs */
                    initialize: function(options) {
                        /** @private */
                        this._views = {};
                        /** @private */
                        this._viewPaths = './views/';

                        this.listenTo(globals.events, globals.EVENT.viewUnloaded, _.bind(this._viewUnloaded, this))
                            .listenTo(globals.events, globals.EVENT.authLoggedIn, _.bind(this._authLoggedIn, this))
                            .listenTo(globals.events, globals.EVENT.authLoggedOut, _.bind(this._authLoggedOut, this));

                    },

                    /** @private */
                    _authLoggedIn: function(returnUrl) {
                        var query;

                        this.navigate(returnUrl || '', {
                            trigger: true
                        });

                        (new Parse.Query(Parse.Role)).equalTo('users', Parse.User.current()).first().done(function(u) {

                            if (u) {
                                Parse.User.current().admin = true;
                            }
                        });


                    },

                    /** @private */
                    _authLoggedOut: function() {
                        this.navigate('', {
                            trigger: true
                        });
                    },

                    /** @private */
                    _viewUnloaded: function(view) {
                        var self = this;

                        _.find(this._views, function(v, k) {

                            if (v === view) {
                                self._views[k] = null;
                                return false;
                            }

                        });
                    },


                });

            return exports;
        });