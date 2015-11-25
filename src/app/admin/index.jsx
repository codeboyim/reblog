require('./style.scss');

import PostModel from 'components/post/model';
import PostEdit from 'components/post/edit';
import Layout from './layout';
import path from 'path';
import router from 'router';

var post;

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

		ReactDOM.render(<Layout model={post}><PostEdit model={post} /></Layout>, document.body);
	}
}

function postChanged(event, post, ...args){

	switch(event){

		case 'sync':
			router.setRoute(path.join('/a/p', post.get('objectId') || 'new'));
			break;	
	}
}

export { render };