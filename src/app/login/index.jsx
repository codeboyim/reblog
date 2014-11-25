var Layout = require('components/layout'),
		Login = require('components/login');

module.exports = (rtnUrl) =>{
	React.render(<Layout><Login returnUrl={rtnUrl} /></Layout>, document.body);
};