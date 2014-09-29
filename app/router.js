/* jshint esnext: true */

module.exports = Backbone.Router.extend(
    /** @lends Router.prototype */
    {

        routes: {
            '': 'home',
            'posts/create': 'posts',
            'posts/:id': 'posts',
            'posts/:id/:action': 'posts',

            'admin(/)': 'admin',
            'admin/:area(/)': 'admin',
            'admin/:area(/:arg1)': 'admin',

            'login?returnUrl=:returnUrl': 'login',
            'login': 'login'
        },

        home: function () {
            require.ensure([], function () {
                React.renderComponent(require('./home')(), document.body);
            });
        },

        admin: function (area) {
            var args = _.compact([].slice.apply(arguments)),
                that = this;

            if (this.isAuthenticated('admin' + args.join('/'))) {
                require.ensure([], function () {
                    require('./admin').apply(that, args);
                });
            }
        },

        login: function (returnUrl) {
            if (Parse.User.current()) {
                this.navigate(returnUrl || '', {
                    trigger: true
                });
            } else {
                require.ensure(['./login'], require=>
                    React.renderComponent(require('./login')({
                        onLoggedin: _.bind(this._onLoggedin, this, returnUrl)
                    }), document.body)
                );
            }

        },

        /** @constructs */
        initialize: function (options) {
            _.bindAll(this, '_authStatusChanged');

            globals.subscribe(globals.EVENT.authStatusChanged, this._authStatusChanged);
            this.route('admin/posts/:id', _.bind(this.admin, this, 'posts'));
        },


        _authStatusChanged: function (authenticated, returnUrl) {

            if (!authenticated) {
                this.navigate('', {
                    trigger: true
                });
            }

        },

        _onLoggedin: function (returnUrl) {
            this.navigate(returnUrl || '', {
                trigger: true
            });

            globals.broadcast(globals.EVENT.authStatusChanged, true);
        },

        isAuthenticated: function (returnUrl) {

            if (!Parse.User.current()) {
                this.navigate('login?returnUrl=' + encodeURIComponent(returnUrl), {
                    trigger: true
                });
                return false;
            } else {
                return true;
            }
        }

    }
);