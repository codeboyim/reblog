require('./style.scss');

var Layout = React.createClass({

    render() {
        return (
        	<div className="admin">
                <aside className="adminSidebar">
                    <a href="/">Home</a>
                    <ul>
                        <li><a href="/admin/new">New post</a></li>
                        <li><a href="/admin/posts">Posts</a></li>
                        <li><a href="/admin/drafts">Drafts</a></li>
                    </ul>
                </aside>
        		<div className="adminMain">
        		{this.props.children}
        		</div>
          </div>
        );
    }

});

module.exports = Layout;