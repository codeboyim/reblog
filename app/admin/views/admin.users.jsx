define(['react', 'parse', 'globals'], function(React, Parse, globals){


    var exports = React.createClass({
    
        getInitialState:function(){
            return {users:null};
        },
        
        componentDidMount:function(){
            var users, self = this;
            
            (new Parse.Query(Parse.User))                    
                    .find()
                    .then(function(_users){
                        users = _users;
                        return (new Parse.Query(Parse.Role))
                                .equalTo('name', 'Administrators')
                                .first();
                    })
                    .then(function(r){
                        if(r){
                            return r.getUsers().query().find();
                        }
                    }).then(function(admins){
                        _.each(users, function(user){
                                    
                            if(_.find(admins, function(admin){return admin.id===user.id;})){
                                user.isAdmin = true;
                            }
                            
                        });
                                    
                        self.setState({users:users});
                    }).fail(function(error){
                        console.log(error);
                    });
        },
        
        render: function(){
            var self = this;
            if(!Parse.User.current().admin){
                return null;
            }
            return (
                <section>
                    <h1>Users</h1>
                    <ul>
                    {_.map(this.state.users, function(user){
                        return (
                            <li key={user.id}>
                                <label>
                                    <input type="checkbox" checked={user.isAdmin} onChange={_.bind(this.onCheckboxChanged, this, user)} />
                                    {user.get('name')}
                                </label>
                            </li>
                            );
                    }, this)}
                    </ul>
                </section>
            );

        },
        
        componentWillUnmount:function(){
            console.log('admin user will unmount');
        
        },
        
        onCheckboxChanged:function(user, e){
            user.isAdmin = !user.isAdmin;
            this.setState({users:this.state.users});
            
            console.log(this.state.users);
        }
        

    });
    
    return exports;

});