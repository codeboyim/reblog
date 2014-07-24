define(['backbone', 'underscore', 'react', '../models/PostCollection', 'jsx!./jsx/list', 'events'], function(Backbone, _, React, PostCollection, PostList, events) {
    /**
     * @module post/list/view
     */

    var reactComponent;

    /**
     * @constructor
     * @param {object} options
     *        {Element} options.attachTo
     */
    var exports = function(options) {
        /** @private */
        this._authenticated = false;
        /** @member */
        this.attachTo = options.attachTo;
        /** @member */
        this.posts = new PostCollection();

        _.extend(this, Backbone.Events).listenTo(this.posts, 'all', _.bind(this.render, this));
        events.on('auth:statusChanged', this._authStatusChanged);
    };

    exports.prototype.render = function() {

        reactComponent = React.renderComponent(PostList({
                posts: this.posts,
                editable: this._authenticated
            }),
            this.attachTo);

        return reactComponent;
    };

    exports.prototype._authStatusChanged = function(authenticated) {

        if (reactComponent) {
            reactComponent.setProps({
                editable: authenticated
            });
        }

    };

    return exports;
});