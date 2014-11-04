var Layout = require('components/Layout');

var Home = React.createClass({
	render(){
		return <Layout><h1>Home</h1></Layout>;
	}
});

React.render(<Home/>, document.body);