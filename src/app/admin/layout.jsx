require('./style.scss');

var Layout = React.createClass({

    render() {
        return (
        	<div className="admin">
                <aside className="adminSidebar">
                    <a href="/">Home</a>
                    <ul>
                        <li><a class="adminSidebarLink" href="/a/new">New post</a></li>
                        <li><a class="adminSidebarLink" href="/a/posts">Posts</a></li>
                        <li><a class="adminSidebarLink" href="/a/drafts">Drafts</a></li>
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