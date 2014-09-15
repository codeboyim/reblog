/** @jsx React.DOM */
// jshint ignore: start

var Layout = require('./views/_layout'),
    Home = require('./views/home'),
    Posts = require('./views/posts'),
    Post = require('components/Post');


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
                <Layout area={area}>
                    <Posts onAddPostClicked={_.bind(onAddPostClicked, this)}/>
                </Layout>
            , container);
        } else {
            React.renderComponent(<Layout area={area}><Post id={arg1 === 'create' ? 0 : arg1}
                editView={true}  onSaved={_.bind(onPostSaved, this, arg1 === 'create')} /></Layout>
            , container);
        }
        break;

    default:
        React.renderComponent(<Layout><Home /></Layout>, container);
        break;

    }
    
    
    
};