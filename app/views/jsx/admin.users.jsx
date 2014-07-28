define(['react', 'parse', 'globals'], function(React, Parse, globals){


    var exports = React.createClass({
    
        getInitialState:function(){
            return {users:this.props.users};
        },
        
        componentWillReceiveProps:function(newProps){
            this.setState({users:newProps.users});
        },

        render: function(){
            var self = this;
            return (
                <div>
                    <ul>
                    {_.map(this.state.users, function(user){
                        return (
                            <li key={user.id}>
                                <label><input type="checkbox" checked={user.isAdmin} onChange={_.bind(self.onCheckboxChanged, self, user)} />{user.get('name')}</label>
                            </li>
                            );
                    })}
                    </ul>
                </div>
            );

        },
        
        onCheckboxChanged:function(user, e){
            user.isAdmin = !user.isAdmin;
            this.setState({users:this.state.users});
            
            console.log(this.state.users);
        }
        

    });
    
    return exports;

});