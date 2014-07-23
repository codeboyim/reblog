define(['parse', 'react'], function(Parse, React){

    var Header = React.createClass({    

        render: function(){
            var user = Parse.User.current();

            return (
                <div>{user?<a href="#posts/create">Create a new post</a>:null}</div>
                );
        }

    });

    function load(){

        return React.renderComponent(
            <Header />,
            document.getElementById('site-header')
        );
    }


    return {
        load:load
    };
    
});