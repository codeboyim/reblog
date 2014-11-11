require('./style.scss');

module.exports = function(path, ...args){
	var PostEdit = require('components/post/edit'),
			Layout = require('./layout'),
			docBody = document.body;

	if(~['new', 'posts', 'drafts'].indexOf(path)){
		React.render(<Layout activeMenuItemUid={path}><PostEdit /></Layout>, docBody);
	}
}