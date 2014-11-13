require('./style.scss');

var PostModel = require('components/post/model'),
		slug = require('slug'),
		post,
		path,
		autoSaveTimeoutId;

function render(_path){
	var PostEdit = require('components/post/edit'),
			Layout = require('./layout'),
			docBody = document.body;

	 path = _path;

	if(~['new', 'posts', 'drafts'].indexOf(path)){

		if(!post){
			post = new PostModel();
			post.on('all', postChanged)
		}

		React.render(<Layout activeMenuItemUid={path} dataModel={post}><PostEdit model={post} /></Layout>, docBody);
	}
}

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

module.exports = render; 