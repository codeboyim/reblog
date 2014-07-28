define(['react', 'parse', 'globals'], function(React, Parse, globals){


    var exports = React.createClass({

        render: function(){
            
            return (
                <div>
                    <ul>
                        <li><a href="#admin">Admin Home</a></li>
                        <li><a href="#admin/users">Users</a></li>
                    </ul>
                    <div></div>
                </div>
            );

        }

    });
    
    return exports;

});