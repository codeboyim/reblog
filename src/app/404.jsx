var Layout = require('components/layout');

class NotFound{

	render(){
		return (<div>
			<h1>404</h1>
			<p>The page or the post you are trying to access doesnt exist</p>
		</div>);
	}

}

var NotFoundComponent = React.createClass(NotFound.prototype);

module.exports = ()=>{
	React.render(<Layout><NotFoundComponent /></Layout>, document.body);	
}