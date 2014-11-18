var Layout = require('components/layout'),
		Login = require('components/login');

module.exports = () =>{
	React.render(<Layout><Login /></Layout>, document.body);
};