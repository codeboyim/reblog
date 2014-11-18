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
		}

		if(Array.isArray(args) && args.length > 0 && args[0].id !== post.id){
			post.reset({silent:true});
			
			if(args[0].id){
				post.id = args[0].id;
			}
		}

		React.render(<Layout model={post}><PostEdit model={post} /></Layout>, docBody);
	}
}

function postChanged(event, post, ...args){

	switch(event){

		case 'destroy':
			if(args[1]){
				router.setRoute(path.join('/a/p', args[1].nextPostId || 'new'));
			}
			break;

		case 'sync':
			router.setRoute(path.join('/a/p', post.id || 'new'));
			break;	
	}
}

module.exports = render; 