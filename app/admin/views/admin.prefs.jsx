define(['react', 'parse', 'globals'], function(React, Parse, globals){


    var exports = React.createClass({
   
        componentDidMount:function(){
        },
        
        render: function(){

            return (
                    <section>
                        <h1>Preferences</h1>
                        <div><button onClick={this.buttonDeleteClicked}>Delete my account</button></div>
                    </section>
                    );

        },
        
        buttonDeleteClicked:function(){
            Parse.User.current().destroy().done(function(){
                Parse.User.logOut();
                globals.events.trigger(globals.EVENT.authStatusChanged, false);
            });
        }

    });
    
    return exports;

});