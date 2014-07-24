define(['parse', 'react', 'underscore', 'backbone', 'events', 'jsx!./jsx/header'], function(Parse, React, _, Backbone, events, Header) {

    /**
     *@module header
     **/

    var exports = function() {
        var self = this;

        /** @private */
        this._authenticated = !! Parse.User.current();
        /** @private */
        this._reactComponent = null;

        events.on('auth.statusChanged', function(authenticated) {
            if (self._reactComponent) {
                self._reactComponent.setProps({
                    authenticated: authenticated
                });
            }
        });
    };

    exports.prototype.render = function() {

        this._reactComponent = React.renderComponent(
            Header({
                authenticated: this._authenticated
            }), document.getElementById('site-header'));

        return this._reactComponent;
    };

    return exports;

});