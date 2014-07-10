/**
 * @module post
 */

define(['require', 'jquery', './PostModel', 'jsx!./views/list'], function(require, $, PostModel) {
    var post,
        viewPath = 'jsx!./views/',
        views = {},
        /**@private */
        _container;

    /**
     * initialize post module
     * @param {$=} container - jQuery element to append post views, default to <body>
     */
    function init(container) {
        _container = container ? container : $(document.body);
        post = new PostModel();
    }

    /**
     * load views
     * @param {String} name - view name to load
     * @param {$=} attachTo - jQuery element the view is attached to. default to the _container
     * @return {backbone.View}
     */
    function load(name, attachTo) {
        var v = views[name];
        attachTo = attachTo ? attachTo : _container;

        if (!v) {
            try {
                v = require(viewPath + name);
                v = new v({
                    el: attachTo
                });
            } catch (err) {
                console.error('requested view - "' + name + '" doesn\'t exist');
                return;
            }

            views[name] = v;
        }

        v.render();

    }

    /**
     * unload views
     * @param {String} name - view name to unload
     */
    function unload(name) {
        var v = views[name] && views[name].view;

        if (!v) {
            console.error('requested view - "' + name + '" is not loaded');
            return;
        }

        v.attachTo.detach();
    }

    /**
     * post module APIs
     */
    return {
        init: init,
        load: load
    };
});