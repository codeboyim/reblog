module.exports = function(path){
	var AdminNew,
			docBody = document.body;

	switch(path){

		case 'new':
			AdminNew = require('./new');
			React.render(<AdminNew />, docBody);
		break;

	}
}