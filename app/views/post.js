define(['backbone', 'underscore', 'react', '../models/Post', '../models/PostCollection', 'moment', 'jsx!./jsx/post'], function(Backbone, _, React, PostModel, PostCollection, moment, Post) {

    /**
     * @module post/post
     */

    var reactComponent;

    /**
     * @constructor
     */
    var exports = function(options) {
        //* @private */
        this._authenticated = false;
        //* @private */
        this._router = options.router;

        /** @member */
        this.post = new PostModel();
        /** @member */
        this.attachTo = options.attachTo;
        
        _.extend(this, Backbone.Events).listenTo(this.post, 'all', _.bind(this.render, this));
    };

    exports.prototype.render = function() {

        reactComponent = React.renderComponent(Post({
                editMode: this._authenticated,
                post: this.post,
                view: this
            }),
            this.attachTo);

        return reactComponent;
    };

    exports.prototype.unload = function() {
        this.post.clear();
        React.unmountComponentAtNode(this.attachTo);
    };

    return exports;
});