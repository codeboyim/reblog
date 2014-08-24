define(['react', 'parse', 'globals', 'jsx!./_layout'], function(React, Parse, globals, Layout){


    var exports = React.createClass({

        render: function(){

            return (
                <Layout>
                    <section>
                        <h3>Preferences</h3>
                        <div><button onClick={this.buttonDeleteClicked}>Delete my account</button></div>
                    </section>
                </Layout>
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