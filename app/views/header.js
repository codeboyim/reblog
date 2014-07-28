define(['parse', 'react', 'underscore', 'backbone', 'globals', 'jsx!./jsx/header'], function(Parse, React, _, Backbone, globals, Header) {

    /**
     *@module header
     **/

    /**
     * @constructor
     * @param {object} options
     *        {Element} options.container
     */
    var exports = function(options) {

        /** @private */
        this._authenticated = !! Parse.User.current();
        /** @private */
        this._reactComponent = null;
        this.container = options.container;

        _.extend(this, Backbone.Events)
            .listenTo(globals.events, globals.EVENT.authStatusChanged, _.bind(this._authStatusChanged, this));

        this._reactComponent = React.renderComponent(
            Header({
                authenticated: this._authenticated
            }), this.container);
    };

    exports.prototype._authStatusChanged = function(authenticated) {
        if (this._reactComponent) {
            this._reactComponent.setProps({
                authenticated: authenticated
            });
        }
    };

    return exports;

});