/** @jsx React.DOM */
// jshint ignore: start

var Layout = require('./components/_layout'),
    Home = require('./components/home'),
    Posts = require('./components/posts'),
    Post = require('components/Post'),
    Prefs = require('./components/prefs'),
    Users = require('./components/users');


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
                React.renderComponent(
                    <Layout area='posts'>
                        <Posts onAddPostClicked={_.bind(onAddPostClicked, this)}/>
                    </Layout>
                , container);
            } else {
                React.renderComponent(<Layout area='posts'><Post id={arg1 === 'create' ? 0 : arg1}
                    editView={true}  onSaved={_.bind(onPostSaved, this, arg1 === 'create')} /></Layout>
                , container);
            }
            break;

       case 'prefs':
            React.renderComponent(<Layout area='prefs'><Prefs /></Layout>, container);
            break;

        case 'users':
            React.renderComponent(<Layout area='users'><Users /></Layout>, container);
            break;

        default:
            React.renderComponent(<Layout><Home /></Layout>, container);
            break;

    }
    
};