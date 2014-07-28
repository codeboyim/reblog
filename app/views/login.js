define(['react', 'parse', 'backbone', 'underscore', 'globals'], function (React, Parse, Backbone, _, globals) {

    /**
     * @constructor
     * @param {object} options
     *        {Element} options.container
     */
    var exports = function (options) {
        options = options || {};
        this.container = options.container;
        this._returnUrl = options.returnUrl || '';

        _.extend(this, Backbone.Events);

        React.renderComponent(
            React.DOM.button({
                onClick: _.bind(this._loginClicked, this)
            }, 'login'), this.container);

    };

    exports.prototype._loginClicked = function (e) {
        var self = this;

        e.preventDefault();

        Parse.FacebookUtils.logIn(null, {

            success: function (user) {

                FB.api(user.get('authData').facebook.id, function (res) {
                    var acl;
                    
                    if (user.get('name') !== res.name) {
                        user.set('name', res.name);
                    }

                    if (!user.existed()) {
                        acl = new Parse.ACL();
                        acl.setRoleReadAccess('Administrators',true);
                        acl.setPublicReadAccess(false);
                        user.setACL(acl);
                    }
                    
                    user.save();

                });
                
                globals.events
                    .trigger(globals.EVENT.authStatusChanged, true)
                    .trigger(globals.EVENT.authLoggedIn, self._returnUrl);
            },
            error: function (user, error) {
                console.error("User cancelled the Facebook login or did not fully authorize.");
            }
        });
    };

    exports.prototype.unload = function () {
        React.unmountComponentAtNode(this.container);
        this.stopListening();
        globals.events.trigger(globals.EVENT.viewUnloaded, this);
    };

    return exports;
});