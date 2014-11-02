/** @jsx React.DOM */

module.exports = React.createClass({

    render: function(){

        return (
            <section>
                <h3>Preferences</h3>
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