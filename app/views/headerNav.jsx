define(['react', 'parse', 'globals', 'mixins/ListenToAuthStatusChanged'], function(React, Parse, globals, ListenToAuthStatusChanged){

    var exports = React.createClass({
        displayName: 'headerNav',
        
        mixins:[ListenToAuthStatusChanged],
        
        getInitialState : function (){
            return {authenticated: !!Parse.User.current()}
        },
        
        logoutClicked : function (e){
            e.preventDefault();
            Parse.User.logOut();
            globals.events.trigger(globals.EVENT.authStatusChanged, false);
        },

        render: function(){
            
            return (
                <ul>
                    {this.state.authenticated?
                        <li><a href="javascript:void(0);" onClick={this.logoutClicked}>Log out</a></li>
                        :null}
                </ul>
            );

        }

    });
    
    return exports;
});