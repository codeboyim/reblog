
class Layout{

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
            }),
            headerNavMenuItems = [
                {
                    'publish': {
                        title: 'Publish'
                    }
                }, {
                    'withdraw': {
                        title: 'Withdraw'
                    }
                }, {
                    'preview': {
                        title: 'Preview'
                    }
                }, {
                    'share': {
                        title: 'Share'
                    }
                }, {
                    'more': {
                        title: 'More',
                        body: [
                            <div>
                                <label>Friendly URL</label><input type="text" value={this.state.data.seoUrl} readOnly={true}/>
                            </div>,
                            <div>
                                <label>Attachments</label>
                                <ul></ul>
                            </div>,
                            <div className="text-center">
                                <button className="button alert" onClick={ this._deleteClicked }>Delete</button>
                            </div>
                        ]
                    }
                }
            ];

        return (
        	<div className="admin" onClick={this._documentBodyClicked}>
                <header className={cxHeader}>
                    <i ref="toggle" className="adminSidebarToggler" onClick={this._toggleSidebar}></i>
                    {
                        this.state.notification ?
                        (
                            <div className={'adminHeaderNotification ' + this.state.notification.type}>{this.state.notification.text}</div>
                        )
                        : null
                    }
                    <ul className="adminHeaderNav">
                        {
                            headerNavMenuItems.map((menuItem) => {
                                var key = Object.keys(menuItem)[0],
                                    item = menuItem[key],
                                    active = this.state.activeNavDropdownUid === key,
                                    cxDropdown = cx({'adminHeaderNavDropdown': true, active: active}),
                                    isDraft = this.props.dataModel.get('isDraft');

                                if(isDraft && key === 'withdraw' || !isDraft && key === 'publish'){
                                    return null;
                                }

                                return (
                                    <li key={key} className={cxDropdown + ' key'}>
                                        <div className={ 'dropdownTitle ' + key } onClick={this._toggleNavDropdown.bind(this, key)}>
                                            <i className="fa"/><span>{item.title}</span>
                                        </div>
                                        {
                                            active && item.body? (
                                            <div className={'dropdownBody ' + key}>{item.body}</div>
                                            ):
                                            null
                                        }
                                    </li>
                                );
                            })
                        }
                    </ul>
                </header>
                <aside className={cxSidebar} ref="sidebar">
                    <div ref="logo" className="adminLogo">
                        <a href="/">Re/blog</a>
                    </div>
                    <div ref="compose" className="adminSidebarButtonComposeWrap">
                        <a className="button adminSidebarButton adminSidebarButtonCompose" href="/a/new">Compose</a>
                    </div>
                    <ul ref="nav" className="adminSidebarNav">
                        {this._renderMenuItem('drafts')}
                        {this._renderMenuItem('posts')}
                    </ul>
                </aside>
                <div className={cxMain}>
            		{this.props.children}
        		</div>
          </div>
        );
    }

    _renderMenuItem(key){
        var menuItems = {
                'posts': {
                    'href': '/a/posts',
                    'text': 'Published',
                },
                'drafts': {
                    'href': '/a/drafts',
                    'text': 'Drafts',
                }
            },
            item = menuItems[key];

        if(!item){
            return null;
        }

        if(this.props.activeMenuItemUid === key || this.props.activeMenuItemUid === 'new' && key === 'drafts'){
            item.cx = 'active';
            item.height = this.state.activeContentHeight
        }

        return (
            <li key={key} className={item.cx}>
                <a ref='menuItemTitle' className="adminSidebarButton" href={ item.href }>{ item.text }</a>
                <div className='adminMenuItemContent' style={{ height: item.height? (item.height + 'px') : null }}>
                    {item.content}
                </div>
            </li>
        );
    }

    getDefaultProps(){
        return {
            activeMenuItemUid:'new',
            dataModel: null
        };
    }

    getInitialState(){
        return {
            isSidebarVisible: false,
            activeContentHeight: 1,
            activeNavDropdownUid: '',
            data: this.props.dataModel? this.props.dataModel.toJSON() : null,
            notification: null //{ text: '', type: 'info' }
        };
    }

    componentDidMount(){
        this._resizeActiveMenuContent();
        window.addEventListener('resize', this._resizeActiveMenuContent);
        document.body.addEventListener('click', this._toggleSidebar);

        if(this.props.dataModel){
            this.props.dataModel.on('all', this._dataModelChanged);
        }
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this._resizeActiveMenuContent);
        document.body.removeEventListener('click', this._toggleSidebar)
    }

    _resizeActiveMenuContent(){
        var menuItemsCount = 2,
            collapsedContentHeight = 1,
            sidebarHeight = this.refs.sidebar.getDOMNode().offsetHeight;

        this._fixedHeight = this._fixedHeight || 
            ( 
                menuItemsCount * this.refs.menuItemTitle.getDOMNode().offsetHeight +
                (menuItemsCount - 1) * collapsedContentHeight +
                this.refs.compose.getDOMNode().offsetHeight +
                this.refs.logo.getDOMNode().offsetHeight
            );

        window.requestAnimationFrame(function(){
            this.setState({ activeContentHeight: sidebarHeight - this._fixedHeight });
        }.bind(this));
    }

    /**
     * toggle sidebar
     * @param {(boolean|object)} args - to be passed true/false to show/hide the toolbar, or bound to an event and then to toggle between show & hide
     */
    _toggleSidebar(arg){
        var visible = false,
            sidebarDom = this.refs.sidebar.getDOMNode();

        if(typeof arg === 'boolean'){
            visible = arg;
        }    
        else if(arg.target === this.refs.toggle.getDOMNode()){
            visible = !this.state.isSidebarVisible;
            arg.stopPropagation();
        }
        else if(sidebarDom !== arg.target 
            && !~[].slice.apply(sidebarDom.getElementsByTagName(arg.target.tagName)).indexOf(arg.target)){
            visible = false;
        }
        else{
            visible = true;
        }

        this.setState({isSidebarVisible:visible});
    }

    _toggleNavDropdown(key, e){
        var uid = '';

        if(this.state.activeNavDropdownUid !== key && ~['more', 'share'].indexOf(key)){
            uid = key;
        }

        this.setState({ activeNavDropdownUid: uid });
    }

    _dataModelChanged(event, data){

        switch(event){
            case 'change':
                this.setState({ data: data.toJSON() });
                break;

            case 'save':
                this.setState({ notification: { text: 'saving', type: 'info' } });
                break;

            case 'sync':
                this.setState({ notification: null });
                break;
        }
    } 
}

module.exports = React.createClass(Layout.prototype);