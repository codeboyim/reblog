var Layout = require('components/layout');

module.exports = function(title){

	if(!title){
		React.render(<Layout><h1>Home</h1></Layout>, document.body);
	}else{
		console.log(title);
	}
};