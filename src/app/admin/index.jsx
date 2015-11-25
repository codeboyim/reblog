require('./style.scss');

var PostModel = require('components/post/model'),
		PostEdit = require('components/post/edit'),
		Layout = require('./layout'),
		post,
		path = require('path'),
		router = require('router');

function render(path, ...args){

	if(path === 'post'){

		if(!post){
			post = new PostModel();
			post.on('all', postChanged);       
		}

		if(Array.isArray(args) && args.length > 0 && args[0].id !== post.get('objectId')) {
			post.reset({silent:true});
			
			if(args[0].id){
				post.set('objectId', args[0].id);
			}
		}

		React.render(<Layout model={post}><PostEdit model={post} /></Layout>, document.body);
	}
}

function postChanged(event, post, ...args){

	switch(event){

		case 'sync':
			router.setRoute(path.join('/a/p', post.get('objectId') || 'new'));
			break;	
	}
}

module.exports = render; 