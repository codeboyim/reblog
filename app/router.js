var Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse'),
    Login = require('./views/login'),
    globals = require('./globals');


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
                require('./home')();
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
                require('react').renderComponent(Login({
                    onLoggedIn: _.bind(onLoggedIn, this, returnUrl)
                }), document.getElementById('site-content'));
            }

        },

        /** @constructs */
        initialize: function (options) {
            _.bindAll(this, '_authStatusChanged');

            this.listenTo(globals.events, globals.EVENT.authStatusChanged, this._authStatusChanged);
            this.route('admin/posts/:id', _.bind(this.admin, this, 'posts'));
        },


        _authStatusChanged: function (authenticated) {

            if (!authenticated) {
                this.navigate('', {
                    trigger: true
                });
            }

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


function onLoggedIn() {}