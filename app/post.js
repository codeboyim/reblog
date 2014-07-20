/**
 * @module post
 */

define(['require', 'jquery', 'underscore', 'jsx!./views/list', 'jsx!./views/post', './backend', 'backbone', ], function (require, $, _) {
    var post,
        viewPath = 'jsx!./views/',
        views = {},
        router,
        _container;

    /**
     * initialize post module
     * @param {$=} container - jQuery element to append post views, default to <body>
     */
    function init(container) {
        _container = container ? container : $(document.body);
        router = new Posts();
        return router;
    }

    /**
     * load views
     * @param {String} name - view name to load
     * @param {object=} options - hash object passed to view initialize function
     * @return {object} view
     */
    function load(name, options) {
        var v;

        if (!views[name]) {
            v = require(viewPath + name);
            v = new v(_.extend({
                router: router
            }, options));
            views[name] = v;
        }

        return views[name];
    }

    /**
     * unload views
     * @param {String} name - view name to unload
     */
    function unload(name) {
        var v = views[name];

        if (v) {
            v.unload();
            return true;
        } else {
            return false;
        }
    }

    /**
     * Posts router
     */
    var Posts = require('backbone').Router.extend({

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

                load('list', {
                    attachTo: _container.get(0),
                    editable: true
                }).posts.fetch();

            } else {

                if (arguments[0] === 'create') {

                    load('post', {
                        attachTo: _container.get(0),
                        editMode: true
                    }).render();

                } else {
                    id = Number(arguments[0]);
                    action = arguments[1];

                    if (isNaN(id)) {
                        throw Error('invalid param id');
                    }

                    view = load('post', {
                        attachTo: _container.get(0)
                    });

                    view.post.set({
                        'id': id
                    }, {
                        silent: true
                    });

                    if (action === 'edit') {
                        view.editMode = true;
                        view.post.fetch();
                    }
                }
            }
        },

        initialize: function (options) {}
    });

    /**
     * post module APIs
     */
    return {
        init: init
    };
});