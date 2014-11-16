require('./style.scss');

var PostModel = require('components/post/model'),
		post;

function render(path, ...args){
	var PostEdit = require('components/post/edit'),
			Layout = require('./layout'),
			docBody = document.body;


	if(~['new', 'published', 'drafts'].indexOf(path)){

		if(!post){
			post = new PostModel();
		}

		post.reset({silent:true}).set({'isDraft':path!=='published'}, {silent:true});

		if(path !== 'new' && Array.isArray(args) && args.length > 0){
			post.id = args[0].id || '';
		}

		path = path === 'new' ? 'drafts' : path;

		React.render(<Layout activeMenuItemUid={path} model={post}><PostEdit model={post} /></Layout>, docBody);
	}
}

module.exports = render; 