require('./style.scss');

var Layout = React.createClass({

    getInitialState() {
        return {
            hidden: true,
            authenticated: !!Parse.User.current()
        };
    },

    render() {
        return (
        	<div className="root">
        		<header className="rootHeader">
        			<h1>Re/blog</h1>
                    <a href="/a/p/new" title="write a new post" className="rootHeaderButton add flaticon-plus72"></a>
        		</header>
        		<div className="rootMain">
        		{this.props.children}
        		</div>
        		<footer className="rootFooter">
	        		<p>Developed by codeboy</p>
        		</footer>
          </div>
        );
    }

});

module.exports = Layout;