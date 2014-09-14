/** @jsx React.DOM */
// jshint ignore: start

var Layout = require('./views/_layout'),
    Home = require('./views/home'),
    React = require('react'),
    Posts = require('./views/posts'),
    _ = require('underscore'),
    PostView = require('views/PostView');


function onAddPostClicked() {
    this.navigate('admin/posts/create', {
        trigger: true
    });
}

function onPostSaved(isCreate, post){
    if (isCreate) {
        this.navigate('admin/posts/' + post.objectId, {
            trigger: true
        });
    }
}

module.exports = function (area, arg1) {
    var container = document.getElementById('site-content');
 
    switch (area) {

    case 'posts':
        if (_.isNull(arg1) || _.isUndefined(arg1)) {
            React.renderComponent(<Layout><Posts onAddPostClicked={_.bind(onAddPostClicked, this)}/></Layout>, container);
        } else {
            React.renderComponent(<Layout><Post id={options[0] === 'create' ? 0 : arg1}
                editView={true}  onSaved={_.bind(onPostSaved, this, options[0] === 'create')} /></Layout>
            , container);
        }
        break;

    case '':
        break;
    }
    
    React.renderComponent(<Layout><Home /></Layout>, document.getElementById('site-content'));
    
};