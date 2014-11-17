var PostModel = require('components/post/model'),
    PostList = require('components/post/list'),
    router = require('router'),
    path = require('path');

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
                            <div key="moreUrl">
                                <label>Friendly URL</label><input type="text" value={this.state.data.seoUrl} readOnly={true}/>
                            </div>,
                            <div key="moreAttachments">
                                <label>Attachments</label>
                                <ul></ul>
                            </div>,
                            <div key="moreButtons" className="text-center">
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
                    {
                        // this.props.dataModel instanceof PostModel 

                    }
                    <ul className="adminHeaderNav">
                        {
                            headerNavMenuItems.map((menuItem) => {
                                var key = Object.keys(menuItem)[0],
                                    item = menuItem[key],
                                    active = this.state.activeNavDropdownUid === key,
                                    cxHash = {'adminHeaderNavDropdown': true, active: active},
                                    cxDropdown = cx(cxHash),
                                    isDraft = this.props.model.get('isDraft');

                                cxHash[key] = true;
                                cxDropdown = cx(cxHash);

                                if(isDraft && key === 'withdraw' || !isDraft && key === 'publish'){
                                    return null;
                                }

                                return (
                                    <li key={key} className={cxDropdown}>
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
                        <a className="button adminSidebarButton adminSidebarButtonCompose" href="/a/p/new">Compose</a>
                    </div>
                    <ul ref="nav" className="adminSidebarNav">
                        {this._renderMenuItem('drafts')}
                        {this._renderMenuItem('published')}
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
                'published': {
                    'text': 'Published'
                },
                'drafts': {
                    'text': 'Drafts'
                }
            },
            item = menuItems[key],
            posts = this.state[key];

        if(!item || !posts){
            return null;
        }

        if(this.state.activeMenuItemUid === key) {
            item.cx = 'active';
            item.height = this.state.activeContentHeight
        }

        return (
            <li key={key} className={item.cx}>
                <button ref='menuItemTitle' className="adminSidebarButton" onClick={this._toggleSidebarMenu.bind(this, key)}>{ item.text }</button>
                <div className='adminMenuItemContent' style={{ height: item.height? (item.height + 'px') : null }}>
                    <PostList path={'/a/' + key} activePostId={this.props.model.id} list={posts} /> 
                </div>
            </li>
        );
    }

    getDefaultProps(){
        return {
            model: null,
            onEvent: function(){}
        };
    }

    getInitialState(){

        return {
            isSidebarVisible: false,
            activeContentHeight: 1,
            activeNavDropdownUid: '',
            activeMenuItemUid: 'drafts',
            data: this.props.model? this.props.model.toJSON() : null,
            notification: null, //{ text: '', type: 'info' }
            drafts: [],
            published: []
        };
    }

    componentDidMount(){
        this._resizeActiveMenuContent();
        window.addEventListener('resize', this._resizeActiveMenuContent);
        document.body.addEventListener('click', this._toggleSidebar);

        if(this.props.model){
            this.props.model.on('all', this._dataModelChanged);
        }

        this._loadPosts();
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this._resizeActiveMenuContent);
        document.body.removeEventListener('click', this._toggleSidebar)
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.model.id !== this.state.data.objectId){
           this.setState({ activeNavDropdownUid: '' });
        }
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

        if(~['publish', 'withdraw'].indexOf(key) && this.props.model.isValid()){
            this.props.model.save({ 'isDraft': !this.props.model.get('isDraft') });
        }

        this.setState({ activeNavDropdownUid: uid });
    }

    _toggleSidebarMenu(key, e){
        e.preventDefault();
        this.setState({ activeMenuItemUid: key});
        this._loadPosts(key);
    }

    _dataModelChanged(event, model){

        switch(event){
            case 'change':
                this.setState({ data: model.toJSON() });
                break;

            case 'save':
                this.setState({ notification: { text: 'saving', type: 'info' } });
                break;

            case 'sync':
               this._loadPosts(); 
                this.setState({ notification: null });
                break;
        }
    } 

    _loadPosts(key){
        var promise,
            newState,
            menuItemUid = key? key: this.state.activeMenuItemUid;

        if(typeof this.state[menuItemUid] === 'undefined'){
            return;
        }

        switch(menuItemUid){

            case 'drafts':
                promise = PostModel.findDrafts();
                break;

            case 'published':
                promise = PostModel.findPublished();
                break;

        }

        if(promise){
            promise.done((posts) => {
                if(this.isMounted()){
                    newState = {};
                    newState[menuItemUid] = posts;
                    this.setState(newState); 
                }
            })
        }
    }

    _deleteClicked(e){
        var post = this.props.model,
            nextPostId = '',
            list = this.state[this.state.activeMenuItemUid],
            len = list.length,
            idx = -1;

        e.preventDefault();

        if(Array.isArray(list)){

            list.every((p, i) => {

                if(p.id === post.id){
                    idx = i;
                    return false;
                }

                return true;
            });

        }

        if(idx !== len - 1){ //if not delete the last one, show next post
            nextPostId = list[idx + 1].id;
        }
        else if(len > 1){ //if delete the last but not the only one, show previous post
            nextPostId = list[idx - 1].id;
        }
        else{ //if delete the only one, go to new
            nextPostId = '';
        }

        this.props.model.destroy({ nextPostId: nextPostId });
    }
}

module.exports = React.createClass(Layout.prototype);