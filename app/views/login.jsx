/** @jsx React.DOM */

var globals = require('../globals'),
    Parse = require('parse'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    React = require('react');

module.exports = require('react').createClass({

    render: function () {
        return <button onClick={this._loginClicked}>login</button>;
    },

    _loginClicked:function (e) {
        var self=this;
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

                (new Parse.Query(Parse.Role)).equalTo('users', Parse.User.current()).first().done(_.bind(function (u) {

                    if (u) {
                        Parse.User.current().admin = true;
                    }

                    self.props.onLoggedIn();

                }, this));
            },
            error: function (user, error) {
                console.error("User cancelled the Facebook login or did not fully authorize.");
            }
        });
    }

});