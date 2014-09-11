var globals = require('../globals'),
    Parse = require('parse'),
    _ = require('underscore');



module.exports = {
    getInitialState: function () {
        return {
            admin: !!(Parse.User && Parse.User.current() && Parse.User.current().admin)
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

