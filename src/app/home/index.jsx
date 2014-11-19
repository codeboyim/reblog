var Layout = require('components/layout'),
		PostCollection = require('components/post/collection'),
		PostList = require('components/post/list');
		posts = new PostCollection;

posts.on('all', postsChanged);

function render(){
		React.render(<Layout><PostList mode="simple" list={posts}/></Layout>, document.body);
}

function postsChanged(event, ...args){
	console.log(args[0]);
	render();
}

module.exports = () => {
	render();
	posts.fetchHomeList();
};