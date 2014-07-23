define(['require','parse', 'react', 'underscore', 'backbone', 'events'], function(require, Parse, React, _, Backbone){
    
    var dispatcher = require('events');
        
    var Header = React.createClass({
        
        loginClicked:function(e){
            e.preventDefault();
            
            Parse.FacebookUtils.logIn(null, {
                success: function (user) {
                    dispatcher.trigger('auth.statusChanged', true);
                },
                error: function (user, error) {
                    console.error("User cancelled the Facebook login or did not fully authorize.");
                }
            });
        },
        
        logoutClicked:function(e){
            e.preventDefault();
            Parse.User.logOut();
            dispatcher.trigger('auth.statusChanged', false);
        },

        render: function(){
            
            return (
                <div>
                    {this.props.authenticated?
                        [<button onClick={this.logoutClicked}>Log out</button>,
                        <a href="#/posts">Create a new blog</a>
                        ]
                        :<button onClick={this.loginClicked}>Log in</button>}
                </div>
            );

        }

    });
    
    function render(){
        
        return React.renderComponent(
            <Header authenticated={!!Parse.User.current()} />,
            document.getElementById('site-header')
        );
    }

    function load(){
        var comp = render();
        
        dispatcher.on('auth.statusChanged', function(authenticated){
            comp.setProps({authenticated:authenticated});
        });
        
        return comp;
    }


    return {
        load:load
    };
    
});