define(['parse', 'react'], function(Parse, React){


function load(){
    var user = Parse.User.current();
    return React.renderComponent(
    <div>{user?<a href="#posts/create">Create a new post</a>:null}</div>,
    document.getElementById('site-header')
    );
}


return {
    load:load
};
});