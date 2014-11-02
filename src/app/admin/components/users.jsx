/** @jsx React.DOM */

module.exports = React.createClass({
    
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
                        
                        if(self.isMounted()){
                            self.setState({users:users});
                        }
                    }).fail(function(error){
                        console.log(error);
                    });
        },
        
        render(){
            var self = this;
            if(!Parse.User.current().admin){
                return null;
            }
            return (
                <section>
                    <h3>Users</h3>
                    <ul>
                    {_.map(this.state.users, function(user){
                        return (
                            <li key={user.id}>
                                <label>
                                    <input type="checkbox" checked={user.isAdmin} onChange={_.bind(this.onCheckboxChanged, this, user)} disabled={user.id===Parse.User.current().id} />
                                    {user.get('name')}
                                </label>
                            </li>
                            );
                    }, this)}
                    </ul>
                </section>
            );

        },
        
        onCheckboxChanged(user, e){
            var isAdmin = false;
            
           (new Parse.Query(Parse.Role)).equalTo('name', 'Administrators').first( role => {
                
                if(role){
                    role.getUsers().query().get(user.id).done( _user => {
                        role.getUsers().remove(user);
                    }).fail( err =>{
                        if(err.code === Parse.Error.OBJECT_NOT_FOUND){
                            role.getUsers().add(user);
                        }
                        
                    }).always((r)=>{
                                              
                        role.save().done(()=>{
                            user.isAdmin = !user.isAdmin;
                            this.setState({users:this.state.users});
                        });
                    });
                }
                
            });
            
        }
        

    });
    