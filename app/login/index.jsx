var Layout = require( 'shared/_layout' );

module.exports = React.createClass({

    render: function () {
        return (
            <Layout>
                <button onClick={this._loginClicked}>login</button>
            </Layout>);
    },

    _loginClicked:function (e) {
        var that = this;
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
                        acl.setRoleReadAccess('Administrators', true);
                        acl.setPublicReadAccess(false);
                        user.setACL(acl);
                    }

                    user.save();

                });

                (new Parse.Query(Parse.Role)).equalTo('users', Parse.User.current()).first().done(function (u) {

                    if (u) {
                        Parse.User.current().admin = true;
                    }

                    if(_.isFunction(that.props.onLoggedin)){
                        that.props.onLoggedin();
                    }
                    
                });
            },
            error: function (user, error) {
                console.error("User cancelled the Facebook login or did not fully authorize.");
            }
        });
    }

});