define(['react', 'parse', 'globals'], function(React, Parse, globals){

    var exports = React.createClass({
        
        logoutClicked:function(e){
            e.preventDefault();
            Parse.User.logOut();
            globals.events.trigger(globals.EVENT.authStatusChanged, false);
            globals.events.trigger(globals.EVENT.authLoggedOut);
        },

        render: function(){
            
            return (
                <ul>
                    {this.props.authenticated?
                        <li><a href="javascript:void(0);" onClick={this.logoutClicked}>Log out</a></li>
                        :null}
                </ul>
            );

        }

    });
    
    return exports;
});