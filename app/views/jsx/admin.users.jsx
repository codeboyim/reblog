define(['react', 'parse', 'globals'], function(React, Parse, globals){


    var exports = React.createClass({

        render: function(){
            
            return (
                <div>
                    <ul>
                    {_.map(this.props.users, function(user){
                        return (
                            <li key={user.id}>
                                <label><input type="checkbox" />{user.get('name')}</label>
                            </li>
                            );
                    })}
                    </ul>
                </div>
            );

        }

    });
    
    return exports;

});