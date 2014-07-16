/**
 * @module post
 */

define(['require', 'jquery', 'jsx!./views/list', 'jsx!./views/post', './backend', 'backbone'], function(require, $) {
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
     * @param {boolean=} holdRendering - when set true, view will not render at the end of the call
     * @return {backbone.View}
     */
    function load(name, options, holdRendering) {
        var v = views[name];

        if (!v) {
            v = require(viewPath + name);
            v = new v(options);
            views[name] = v;
        }

        if (!holdRendering) {
            v.render();
        }

        return v;
    }

    /**
     * unload views
     * @param {String} name - view name to unload
     */
    function unload(name) {
        var v = views[name] && views[name].view;

        if (!v) {
            throw Error('requested view - "' + name + '" is not loaded');
        }

        v.remove();
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

        posts: function(id, action) {
            var view;

            if ((id === null || id === undefined) && (action === null || action === undefined)) {
                load('list', {
                    attachTo: _container.get(0),
                    editable: true
                });
            } else {
                id = Number(id);

                if (!id) {
                    throw Error('invalid param id');
                }

                view = load('post', {
                    attachTo: _container,
                }, true);

                view.model.set({
                    'id': id
                }, {
                    silent: true
                });

                if (action === 'edit') {
                    view.editMode = true;
                    view.model.fetch();
                }
            }
        },

        initialize: function(options) {}
    });

    /**
     * post module APIs
     */
    return {
        init: init
    };
});