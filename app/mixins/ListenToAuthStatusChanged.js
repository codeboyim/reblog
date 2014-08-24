define(['react', 'parse', 'globals', 'underscore'], function (React, Parse, globals, _) {

    var exports = {
        getInitialState: function () {
            return {
                admin: !!Parse.User.current().admin
            };
        },
        componentWillMount: function () {
            _.bindAll(this, '_authStatusChanged');
            globals.events.on(globals.EVENT.authStatusChanged, this._authStatusChanged);
        },
        componentWillUnmount: function () {
            globals.events.off(globals.EVENT.authStatusChanged, this._authStatusChanged);
        },
        _authStatusChanged: function (authenticated) {
            this.setState({
                authenticated: authenticated,
                admin: !!Parse.User.current().admin
            });
        }
    };

    return exports;

});