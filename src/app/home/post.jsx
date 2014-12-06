var Layout = require('components/layout'),
		PostModel = require('components/post/model'),
		Post = require('components/post/view'),
		router = require('router'),
		post = new PostModel;

post.on('all', modelChanged);

function render(){
		React.render(<Layout postId={post.id}><Post post={post} /></Layout>, document.body);
}

function modelChanged(event, model){
	if(event === 'sync'){
		render();
	}
	else if(event === 'notFound'){
		router.setRoute('/404');
	}
}


module.exports = seoUrl => {
	post.set({seoUrl: seoUrl}, {silent: true}).fetchBySeoUrl();
};