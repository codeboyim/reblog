define(['react', 'parse', 'globals', 'jsx!./admin.users', 'jsx!./admin.posts', 'jsx!./admin.prefs'], 

    function(React, Parse, globals, Users, Posts, Prefs){


        var exports = React.createClass({

            getInitialState:function(){
                return {admin:!!Parse.User.current().admin};
            },

            subView: function(){

                switch(this.props.area){
                    case 'users':
                        return this.state.admin?<Users />:null;
                    case 'posts':
                        return this.state.admin?null:null;
                    case 'prefs':
                        return <Prefs />;
                    default:
                        return null;                
                }
            },

            render: function(){
                return (<div>
                            <ul>
                                <li><a href="#admin">Admin Home</a></li>
                                {this.state.admin?<li><a href="#admin/users">Users</a></li>:null}
                                {this.state.admin?<li><a href="#admin/posts">Posts</a></li>:null}
                                <li><a href="#admin/prefs">Preferences</a></li>
                            </ul>
                            <div>{this.subView()}</div>
                        </div>);
            }

        });

        return exports;

    }
);