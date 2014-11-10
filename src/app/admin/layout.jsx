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
console.log(this.props.activeMenuItemUid);
        return (
        	<div className="admin" onClick={this._documentBodyClicked}>
                <header className={cxHeader}>
                    <i className="adminSidebarToggler" onClick={this._toggleSidebar}></i>
                    <nav>
                    </nav>
                </header>
                <aside className={cxSidebar} ref="sidebar">
                    <a ref="logo" className="logo" href="/">Re/blog</a>
                    <ul ref="nav" className="adminSidebarNav">
                        {this._renderMenuItem('new')}
                        {this._renderMenuItem('posts')}
                        {this._renderMenuItem('drafts')}
                    </ul>
                </aside>
                <div className={cxMain}>
            		{this.props.children}
        		</div>
          </div>
        );
    },

    _renderMenuItem(key){
        var menuItems = {
                'new': {
                    'href': '/a/new',
                    'text': 'Write a post',
                    'height': 1,

                },
                'posts': {
                    'href': '/a/posts',
                    'text': 'Posts',
                    'height': 1
                },
                'drafts': {
                    'href': '/a/drafts',
                    'text': 'Drafts',
                    'height': 1
                }
            },
            item = menuItems[key];

        if(!item){
            return null;
        }

        if(this.props.activeMenuItemUid === key){
            item.cx = 'active';
            item.height = this.state.activeContentHeight
        }

        return (
            <li key={key} className={item.cx}>
                <a ref='menuItemTitle' href={ item.href }>{ item.text }</a>
                <div className='adminMenuItemContent' style={{ height: (item.height + 'px') }}>
                    {item.content}
                </div>
            </li>
        );
    },

    getDefaultProps(){
        return {
            activeMenuItemUid:'new'
        };
    },

    getInitialState(){
        return {
            isSidebarVisible: true,
            activeContentHeight: 1
        };
    },

    componentDidMount(){
        this._resizeActiveMenuContent();
        window.addEventListener('resize', this._resizeActiveMenuContent);
        document.body.addEventListener('click', this._hideSidebar);
    },

    componentWillUnmount(){
        window.removeEventListener('resize', this._resizeActiveMenuContent);
        document.body.removeEventListener('click', this._hideSidebar)
    },

    _resizeActiveMenuContent(){
        var menuItemsCount = 3,
            collapsedContentHeight = 1;

        this._fixedSize = this._fixedSize || 
            ( 
                menuItemsCount * this.refs.menuItemTitle.getDOMNode().offsetHeight +
                (menuItemsCount - 1) * collapsedContentHeight +
                this.refs.logo.getDOMNode().offsetHeight
            );

        window.requestAnimationFrame(function(){
            this.setState({ activeContentHeight: this.refs.sidebar.getDOMNode().offsetHeight - this._fixedSize });
        }.bind(this));
    },

    _hideSidebar(e){
        console.log(e.type);
        if(this.state.isSidebarVisible && !~[].slice.apply(this.refs.sidebar.getDOMNode().getElementsByTagName(e.target.tagName)).indexOf(e.target)){
            this._toggleSidebar(false);
        }
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