require('./style.scss');

var PostModel = require('components/post/model'),
		post,
		path = require('path'),
		router = require('router');

function render(path, ...args){
	var PostEdit = require('components/post/edit'),
			Layout = require('./layout'),
			docBody = document.body;


	if(path === 'post'){

		if(!post){
			post = new PostModel();
			post.on('all', postChanged);       
		} else {
			post.reset({silent:true});
		}

		if(Array.isArray(args) && args.length > 0 && args[0].id && args[0].id !== 'new'){
			post.id = args[0].id;
		}

		React.render(<Layout model={post}><PostEdit model={post} /></Layout>, docBody);
	}
}

function postChanged(event, post, ...args){

	if(event === 'destroy'){
		if(args[1]){
			router.setRoute(path.join('/a/p', args[1].nextPostId || 'new'));
		}
	}
}

module.exports = render; 