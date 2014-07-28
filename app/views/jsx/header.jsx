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
                <div>
                    {this.props.authenticated?
                        <button onClick={this.logoutClicked}>Log out</button>
                        :null}
                </div>
            );

        }

    });
    
    return exports;
});