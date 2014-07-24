define(['react'], function(React){

    var exports = React.createClass({
        
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
    
    return exports;

});