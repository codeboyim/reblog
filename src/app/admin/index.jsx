require('./style.scss');

var PostModel = require('components/post/model'),
		slug = require('slug'),
		_post,
		_path;

function render(path){
	var PostEdit = require('components/post/edit'),
			Layout = require('./layout'),
			docBody = document.body;

	_path = path;

	if(~['new', 'posts', 'drafts'].indexOf(path)){

		if(!_post){
			_post = new PostModel();
			_post.on('change', postChanged)
		}

		React.render(<Layout activeMenuItemUid={path} dataModel={_post}><PostEdit model={_post} /></Layout>, docBody);
	}
}

function postChanged(post){
	if(post.hasChanged('title')){
		post.set('seoUrl', slug(post.get('title')));
	}
}

function autoSave(){

	if(this._autoSave.timeoutId){
		window.clearTimeout(this._autoSave.timeoutId);
	}

	this._autoSave.timeoutId = window.setTimeout(() => {
		this.props.model.save();
	}, 5000);
}

module.exports = render; 