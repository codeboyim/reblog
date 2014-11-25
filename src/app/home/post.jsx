var Layout = require('components/layout'),
		PostModel = require('components/post/model'),
		Post = require('components/post/view'),
		post = new PostModel;

post.on('all', modelChanged);

function render(){
		React.render(<Layout postId={post.id}><Post post={post} /></Layout>, document.body);
}

function modelChanged(event, model){
	if(event === 'sync'){
		render();
	}
}


module.exports = seoUrl => {
	post.set({seoUrl: seoUrl}, {silent: true}).fetchBySeoUrl();
};