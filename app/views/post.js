define(['backbone', 'underscore', 'react', 'parse', 'globals', '../models/Post', '../models/PostCollection', 'moment', 'jsx!./jsx/post'], function(Backbone, _, React, Parse, globals, PostModel, PostCollection, moment, Post) {

    /**
     * @module post/post
     */

    /**
     * @constructor
     * @param {object} options
     *        {Element} options.container
     *        {object} options.router
     */
    var exports = function(options) {
        //* @private */
        this._authenticated = !! Parse.User.current();
        //* @private */
        this._router = options.router;
        //* @private */
        this._reactComponent = null;

        /** @member */
        this.post = new PostModel();
        /** @member */
        this.container = options.container;

        _.extend(this, Backbone.Events)
            .listenTo(this.post, 'all', _.bind(this._postChanged, this))
            .listenTo(globals.events, globals.EVENT.authStatusChanged, _.bind(this._authStatusChanged, this));
       
    };

    exports.prototype._postChanged = function() {

        this._reactComponent = React.renderComponent(Post({
                editMode: this._authenticated,
                post: this.post,
                view: this
            }),
            this.container);
    };

    /** @private */
    exports.prototype._authStatusChanged = function(authenticated) {
        if (this._reactComponent) {
            this._reactComponent.setProps({
                editMode: authenticated
            });
        }
    };

    exports.prototype.unload = function() {
        this.post.clear();
        this.stopListening();
        React.unmountComponentAtNode(this.container);
    };

    return exports;
});