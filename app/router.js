    /**
     * App router
     */
    define(['require', 'backbone', 'underscore', 'jsx!./views/list', 'jsx!./views/post', 'jsx!./views/header'], function (require, Backbone, _) {

        var viewPath = 'jsx!./views/';
        var AppRouter = Backbone.Router.extend({

            routes: {
                'posts': 'posts',
                'posts/:id': 'posts',
                'posts/:id/:action': 'posts'
            },

            posts: function () {
                var view,
                    id,
                    action;

                if ((arguments[0] === null || arguments[0] === undefined) && (arguments[1] === null || arguments[1] === undefined)) {

                    this.load('list', {
                        attachTo: document.getElementById('site-content'),
                        editable: true
                    }).posts.fetch().then(null, function (posts, error) {
                        console.error(error);
                    });

                } else {

                    if (arguments[0] === 'create') {

                        this.load('post', {
                            attachTo: document.getElementById('site-content'),
                            editMode: true
                        }).render();

                    } else {
                        id = arguments[0];
                        action = arguments[1];

                        view = this.load('post', {
                            attachTo: document.getElementById('site-content')
                        });

                        view.post.id = id;

                        if (action === 'edit') {
                            view.editMode = true;
                            view.post.fetch().then(function (p) {}, function (p, error) {
                                console.error(error);
                            });
                        }
                    }
                }
            },

            /**
             * load views
             * @param {String} name - view name to load
             * @param {object=} options - hash object passed to view initialize function
             * @return {object} view
             */
            load: function (name, options) {
                var v;

                if (!this.views[name]) {
                    v = require(viewPath + name);
                    v = new v(_.extend({
                        router: this
                    }, options));
                    this.views[name] = v;
                }

                return this.views[name];
            },

            /**
             * unload views
             * @param {String} name - view name to unload
             */
            unload: function (name) {
                var v = this.views[name];

                if (v) {
                    v.unload();
                    return true;
                } else {
                    return false;
                }
            },

            initialize: function (options) {
                this.views = {};
            }
        });

        return new AppRouter();
    });