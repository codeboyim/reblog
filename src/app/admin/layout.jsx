var Layout = React.createClass({

    render() {
        var cx = React.addons.classSet,
            cxSidebar = cx({
               'hide': !this.state.isSidebarVisible 
            }),
            cxMain = cx({
                'shift': this.state.isSidebarVisible,
                'adminMain': true
            }),
            cxHeader = cx({
                'shift': this.state.isSidebarVisible,
                'adminHeader': true
            });

        return (
        	<div className="admin" onClick={this._documentBodyClicked}>
                <header className={cxHeader}>
                    <i onClick={this._toggleSidebar}>{this.state.isSidebarVisible?'hide':'show'}</i>
                    <nav>
                    </nav>
                </header>
                <aside className={cxSidebar} ref="adminSidebar">
                    <a className="logo" href="/">Re/blog</a>
                    <ul className="adminSidebarNav">
                        <li key='new' className={'new'===this.props.activeMenuItemUid?'active':''}>
                            <a href='/a/new'>Write a post</a>
                            <div></div>
                        </li>
                        <li key='posts' className={'posts'===this.props.activeMenuItemUid?'active':''}>
                            <a href='/a/posts'>Posts</a>
                        </li>
                        <li key='drafts' className={'drafts'===this.props.activeMenuItemUid?'active':''}>
                            <a href='/a/drafts'>Drafts</a>
                        </li>
                    </ul>
                </aside>
                <div className={cxMain}>
            		{this.props.children}
        		</div>
          </div>
        );
    },

    getDefaultProps(){
        return {
            activeMenuItemUid:'new'
        };
    },

    getInitialState(){
        return {
            isSidebarVisible: true
        };
    },

    componentDidMount(){
    },

    _documentBodyClicked(e){
    },

    _toggleSidebar(...args){
        var visible = false;

        if(typeof args[0] === 'boolean'){
            visible = args[0];
        }    
        else{
            visible = !this.state.isSidebarVisible;
        }

        this.setState({isSidebarVisible:visible});
    }
});

module.exports = Layout;