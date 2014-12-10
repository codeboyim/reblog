var Layout = require('components/layout'),
		PostCollection = require('components/post/collection'),
		PostList = require('components/post/list');

function render(){
		React.render(<Layout><PostList type="home"/></Layout>, document.body);
}

module.exports = render;