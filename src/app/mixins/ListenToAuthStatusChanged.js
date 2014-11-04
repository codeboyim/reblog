module.exports = {
    getInitialState: function () {
        return {
            admin: !!(Parse.User && Parse.User.current() && Parse.User.current().admin)
        };
    },
    componentWillMount: function () {
        _.bindAll(this, '_authStatusChanged');
        globals.subscribe(globals.EVENT.authStatusChanged, this._authStatusChanged);
    },
    componentWillUnmount: function () {
        globals.unsubscribe(globals.EVENT.authStatusChanged, this._authStatusChanged);
    },
    _authStatusChanged: function (authenticated) {
        if (this.isMounted()) {
            this.setState({
                authenticated: authenticated,
                admin: Parse.User.current() && !!Parse.User.current().admin
            });
        }
    }
};