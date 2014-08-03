define(['backbone', 'underscore', 'react', 'parse', 'globals', '../models/PostCollection', 'jsx!./jsx/list'], function(Backbone, _, React, Parse, globals, PostCollection, PostList) {
    /**
     * @module post/list/view
     */

    /**
     * @constructor
     * @param {object} options
     *        {Element} options.container
     */
    var exports = function(options) {
        /** @private */
        this._authenticated = !! Parse.User.current();
        /** @member */
        this.posts = new PostCollection();
        /** @member */
        this.container = options.container;

        _.extend(this, Backbone.Events)
            .listenTo(this.posts, 'all', _.bind(this._postsEvents, this));

    };

    exports.prototype._postsEvents = function() {
        this._reactComponent = React.renderComponent(PostList({
                posts: this.posts
            }),
            this.container);
    };

    exports.prototype.unload = function() {
        this.stopListening();
        globals.events.trigger(globals.EVENT.viewUnloaded, this);
    };

    return exports;
});