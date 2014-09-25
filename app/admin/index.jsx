/** @jsx React.DOM */
// jshint ignore: start

var AdminLayout = require('./components/_layout'),
    Home = require('./components/home'),
    Posts = require('./components/posts'),
    Post = require('shared/Post'),
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
 
    switch (area) {

        case 'posts':
            if (_.isNull(arg1) || _.isUndefined(arg1)) {
                React.renderComponent(
                    <AdminLayout area='posts'>
                        <Posts onAddPostClicked={_.bind(onAddPostClicked, this)}/>
                    </AdminLayout>
                , document.body);
            } else {
                React.renderComponent(<AdminLayout area='posts'><Post id={arg1 === 'create' ? 0 : arg1}
                    editView={true}  onSaved={_.bind(onPostSaved, this, arg1 === 'create')} /></AdminLayout>
                , document.body);
            }
            break;

       case 'prefs':
            React.renderComponent(<AdminLayout area='prefs'><Prefs /></AdminLayout>, document.body);
            break;

        case 'users':
            React.renderComponent(<AdminLayout area='users'><Users /></AdminLayout>, document.body);
            break;

        default:
            React.renderComponent(<AdminLayout><Home /></AdminLayout>, document.body);
            break;

    }
    
};