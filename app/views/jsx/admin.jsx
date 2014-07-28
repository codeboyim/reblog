define(['react', 'parse', 'globals', 'jsx!./admin.users'], function(React, Parse, globals, Users){


    var exports = React.createClass({
        
        getInitialState:function(){
            return {users:null};
        },

        componentWillReceiveProps:function(newProps){
            var users, self=this;
            
            if(newProps.area==='users'){
                (new Parse.Query(Parse.User))                    
                    .find()
                    .done(function(_users){
                        users = _users;
                        return (new Parse.Query(Parse.Role))
                                .equalTo('name', 'Administrators')
                                .first();
                    })
                    .done(function(r){
                        if(r){
                            return r.getUsers().query().find();
                        }
                    }).done(function(admins){
                        _.each(users, function(user){
                                    
                            if(_.find(admins, function(admin){return admin.id===user.id;})){
                                user.isAdmin = true;
                            }
                                
                        });
                                    
                        self.setState({users:users});
                    }).fail(function(error){
                        console.log(error);
                    });
            }
        },
        
        subView: function(){
            var query,
                self = this;
            
            switch(this.props.area){
            
                case 'users':
                    return <Users users={this.state.users} />;
                default:
                    return null;                
            }
        },

        render: function(){
            
            return (<div>
                        <ul>
                            <li><a href="#admin">Admin Home</a></li>
                            <li><a href="#admin/users">Users</a></li>
                        </ul>
                        <div>{this.subView()}</div>
                    </div>);

        }

    });
    
    return exports;

});