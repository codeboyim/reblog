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
      			<nav>
        			<ul className="layoutNav">
        				<li className="layoutLogo"><a href="/">Re/blog</a></li>
        				<li className="layoutNew"><a href="/post/new">Add a new post</a></li>
        			</ul>
      			</nav>
        		<div className="layoutMain">
        		{this.props.children}
        		</div>
          </div>
        );
    }

});

module.exports = Layout;