var PostModel = require('components/post/model'),
    PostList = require('components/post/list'),
    AttachmentModel = require('components/attachment/model'),
    router = require('router'),
    path = require('path'),
    fileTypes = {
        '^image\\/':'image',
        'pdf':'pdf',
        '^text\\/plain': 'text',
        'msword|officedocument':'word'
    };

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
            model = this.props.model,
            files = model.get('files'),
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
                    'more': {
                        title: 'More',
                        body: [
                            <div key="moreUrl">
                                <label>Friendly URL</label><input type="text" value={this.state.data.seoUrl} readOnly={true}/>
                            </div>,
                            <div key="moreShortDesc">
                                <label>Short Description</label>
                                <textarea name="subtitle" value={this.state.data.subtitle} rows="5" onChange={this._inputChange}></textarea>
                            </div>,
                            <div key="moreAttachments">
                                <label>Attachments</label>
                                <ul className="adminHeaderAttachments">
                                {
                                    Array.isArray(files) ?
                                    files.map((file) => {
                                        return <li key={file.get('file').url()}>
                                            <i className={'fileType ' + this._getFileType(file.get('type'))}></i>
                                            <span className="fileName">{file.get('name')}</span>
                                            <span className="fileCommands">
                                                <i className="fileDelete" onClick={this._fileCommandClicked.bind(this, file, 'delete')}></i>
                                                <i className="fileCopy" onClick={this._fileCommandClicked.bind(this, file, 'copy')}></i>
                                            </span>
                                        </li>;
                                    }):null
                                }
                                </ul>
                                <input ref="fileAttach" type="file" style={{display:'none'}} onChange={this._fileChanged} />
                            </div>,
                            <div key="moreButtons" className="text-center">
                                <button className="adminUploadButton" onClick={this._uploadClicked}><i className="flaticon-upload26"></i>Upload</button>
                                <button className="adminDeleteButton" onClick={ this._deleteClicked }><i className="flaticon-test20"></i>Delete</button>
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
                                            <div className={'dropdownBody ' + key} onClick={this._toggleNavDropdown.bind(this, '')}>{item.body}</div>
                                            ):
                                            null
                                        }
                                    </li>
                                );
                            })
                        }
                    </ul>
                </header>
                <aside className={cxSidebar} ref="sidebar" onClick={this._sidebarClicked}>
                    <div ref="logo" className="adminLogo">
                        <a href="/"><h1>Re/blog</h1></a>
                    </div>
                    <div ref="compose" className="adminSidebarButtonComposeWrap">
                        <a className="adminComposeButton" href="/a/p/new">Compose</a>
                    </div>
                    <ul ref="nav" className="adminSidebarNav">
                        {this._renderMenuItem('drafts')}
                        {this._renderMenuItem('published')}
                    </ul>
                    <div ref="footer" className="adminSidebarFooter">
                        <hr/>
                        <button onClick={this._logoutClicked} className="adminLogoutButton">Log out</button>
                    </div>
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
                    'text': 'Published',
                    'iconclass': 'flaticon-verified9'
                },
                'drafts': {
                    'text': 'Drafts',
                    'iconclass': 'flaticon-write12'
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
                <button ref='menuItemTitle' className="adminSidebarButton" onClick={this._toggleSidebarMenu.bind(this, key)}>
                    { item.text }
                    <i className={item.iconclass}></i>
                </button>
                <div className='adminMenuItemContent' style={{ height: item.height? (item.height + 'px') : null }}>
                    <PostList path={'/a/' + key} activePostId={this.props.model.id} list={posts} /> 
                </div>
            </li>
        );
    }

    getDefaultProps(){
        return {
            model: null
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
            published: [],
            files:[]
        };
    }

    componentDidMount(){
        this._resizeActiveMenuContent();
        window.addEventListener('resize', this._resizeActiveMenuContent);
        window.addEventListener('click', this._windowClicked);
        window.addEventListener('keydown', this._windowKeydown);

        if(this.props.model){
            this.props.model.on('all', this._dataModelChanged);
        }

        this._loadPosts();
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this._resizeActiveMenuContent);
        window.removeEventListener('click', this._windowClicked);
        window.removeEventListener('keydown', this._windowKeydown);
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.model.id !== this.state.data.objectId){
           this.setState({ activeNavDropdownUid: '' });

           if(!nextProps.model.id){
            this.setState({isSidebarVisible:false});
           }
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
                this.refs.logo.getDOMNode().offsetHeight +
                this.refs.footer.getDOMNode().offsetHeight
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
        var visible = false;

        if(typeof arg === 'boolean'){
            visible = arg;
        }    
        else{
            arg.stopPropagation();
            visible = !this.state.isSidebarVisible; 
        }  

        if(visible !== this.state.isSidebarVisible && this.isMounted()){
            this.setState({isSidebarVisible: visible});
        }
    }

    _toggleNavDropdown(key, e){
        var model = this.props.model,
            uid = '';

        if(typeof key === 'object'){
            e = key;
            key = '';
        }

        if(e){
            e.stopPropagation();
        }

        if(!key && e){
            return;
        }


        if(this.state.activeNavDropdownUid !== key && ~['more', 'share'].indexOf(key)){
            uid = key;
        }

        if(~['publish', 'withdraw'].indexOf(key) && model.get('title').trim() && model.get('body').trim()){
            model.save({ 'isDraft': !model.get('isDraft') });
        }

        this.setState({ activeNavDropdownUid: uid });
    }

    _toggleSidebarMenu(key, e){
        e.preventDefault();
        this.setState({ activeMenuItemUid: key});
        this._loadPosts(key);
    }

    _dataModelChanged(event, model, ...args){
        var newState;

        switch(event){

            case 'change':
                newState = { data: model.toJSON() };
                break;

            case 'save':
                newState = { notification: { text: 'saving', type: 'info' } };
                break;

            case 'sync':
                this._loadPosts(); 

                if(this.isMounted()){
                    newState = { notification: null, isSidebarVisible: false, data:model.toJSON() };
                }

                break;
        }

        if(newState && this.isMounted()){
            this.setState(newState);
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

    _flash(message, type){
        this.setState({notification:{text:message, type: type||'info'}});
        window.setTimeout(()=>this.setState({notification:null}), 2000);
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

        this.props.model.destroy().then((model) => {
            if(Array.isArray(model.get('files'))){
                model.get('files').forEach((file) => {
                    file.destroy();
                })
            }
            router.setRoute(path.join('/a/p', nextPostId || 'new'));
        });
    }

    _uploadClicked(e){
        e.preventDefault();
        this.refs.fileAttach.getDOMNode().click();
    }

    _fileChanged(e){
        var file,
            post = this.props.model;

        if(e.target.files.length>0){
            file = e.target.files[0];

            if(!/^\w+(?:\.\w+)$/.test(file.name)){
               this._flash('invalid file name, characters and numbers only', 'error');
               return;
            }
            this.setState({notification: {text: 'uploading', type: 'info' }});
            (new Parse.File(file.name, file))
                .save()
                .always((parseFile) => {
                    this.setState({notification:null});
                    return parseFile;
                })
                .then((parseFile) => {
                    if(parseFile){
                        post.addFile(new AttachmentModel({name: file.name, type: file.type, file: parseFile }));
                    }
                });
        }       
    }

    _getFileType(type){
        var typeIcon = '';
        type = type || '';

        Object.keys(fileTypes).every((key) => {
            var regExp = new RegExp(key);

            if(regExp.test(type)){
                typeIcon = fileTypes[key];
                return false;
            }

            return true;
        })

       return typeIcon; 
    }

    _fileCommandClicked(file, type){
        var post = this.props.model,
            fileType,
            fileName,
            fileUrl,
            insertText = '';

        if(type === 'delete'){
            post.removeFile(file);
        } else if(type === 'copy'){
            fileType = this._getFileType(file.get('type'));
            fileName = file.get('name');
            fileUrl = file.get('file').url();

            if(fileType === 'image'){
               insertText =  `![${fileName}](${fileUrl} "${fileName}")`;
            } else {
               insertText =  `[${fileName}](${fileUrl} "${fileName}")`;
            }
            post.set('insertText', insertText);

        }

    }

    _inputChange(e){
        var newState = {};

        newState[e.target.name] = e.target.value;
        this.props.model.set(newState).delaySave();
    }

    _logoutClicked(e){
        e.preventDefault();
        Parse.User.logOut();
        router.setRoute('/');
    }

    _sidebarClicked(e){
        e.stopPropagation();
    }

    _windowClicked(e){
        this._resetDrawnMenus();
    } 

    _windowKeydown(e){
       if((e.which || e.keyCode) === 27){
        this._resetDrawnMenus();
       } 
    }

    _resetDrawnMenus(){

        if(this.state.isSidebarVisible){
            this._toggleSidebar(false);
        }

        if(this.state.activeNavDropdownUid !=='' ){
            this._toggleNavDropdown('');
        }

    }
}

module.exports = React.createClass(Layout.prototype);