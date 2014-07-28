define(['react', 'parse', 'globals', 'jsx!./admin.users'], function(React, Parse, globals, Users){


    var exports = React.createClass({
        
        subModule: function(){
            var query,
                self = this;
            
            switch(this.props.area){
            
                case 'users':
                    query = new Parse.Query(Parse.User);
                    
                    query.find().then(function(users){
                        self.setProps({users:users});
                    });
                    
                    return this.transferPropsTo(<Users ref="users" />);
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
                        <div>{this.subModule()}</div>
                    </div>);

        }

    });
    
    return exports;

});