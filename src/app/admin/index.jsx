require('./style.scss');

module.exports = function(path, ...args){
	var AdminElm,
			Layout = require('./layout'),
			docBody = document.body;
			
	switch(path){

		case 'new':
			AdminElm = require('./edit');
			React.render(<Layout activeMenuItemUid="new"><AdminElm /></Layout>, docBody);
			break;

		case 'posts':
			// AdminElm = require('./posts');
			React.render(<Layout activeMenuItemUid="posts"><h2>Posts</h2></Layout>, docBody);
			break	

		case 'drafts':
			// AdminElm = require('./drafts');
			React.render(<Layout activeMenuItemUid="drafts"><h2>Drafts</h2></Layout>, docBody);
			break	
	}
}