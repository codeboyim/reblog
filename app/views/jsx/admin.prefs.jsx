define(['react', 'parse', 'globals'], function(React, Parse, globals){


    var exports = React.createClass({
   
        componentDidMount:function(){
        },
        
        render: function(){

            return (
                    <div>
                        <div><button onClick={this.buttonDeleteClicked}>Delete my account</button></div>
                    </div>
                    );

        },
        
        buttonDeleteClicked:function(){
            Parse.User.current().destroy().done(function(){
                Parse.User.logOut();
                globals.events.trigger(globals.EVENT.authStatusChanged, false);
                globals.events.trigger(globals.EVENT.authLoggedOut);
            });
        }

    });
    
    return exports;

});