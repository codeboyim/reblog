require('./style.scss');

var PostModel = require('components/post/model'),
		slug = require('slug'),
		post,
		autoSaveTimeoutId;


function postChanged(event, _post){

	switch(event){

		case 'change:title':
			_post.set('seoUrl', slug(_post.get('title')));
			break;

		case 'change':
			autoSave(_post.changedAttributes);
			break;
	}
}

function autoSave(attrs){

	if(autoSaveTimeoutId){
		window.clearTimeout(autoSaveTimeoutId);
	}

	autoSaveTimeoutId = window.setTimeout(() => {
		post.save(attrs);
	}, 5000);
}

function render(path, ...args){
	var PostEdit = require('components/post/edit'),
			Layout = require('./layout'),
			docBody = document.body;


	if(~['new', 'published', 'drafts'].indexOf(path)){

		if(!post){
			post = new PostModel();
			post.on('all', postChanged)
		}

		post.reset();

		if(path !== 'new' && Array.isArray(args) && args.length > 0){
			post.id = args[0];
		}

		path = path === 'new' ? 'drafts' : path;

		React.render(<Layout activeMenuItemUid={path} model={post}><PostEdit model={post} /></Layout>, docBody);
	}
}

module.exports = render; 