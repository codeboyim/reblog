var PostModel = require('components/post/model'),
    PostList = require('components/post/list'),
    Post = require('components/post/view'),
    AttachmentModel = require('components/attachment/model'),
    router = require('router'),
    path = require('path'),
    fileTypes = {
        '^image\\/':'image',
        'pdf':'pdf',
        '^text\\/plain': 'text',
        'msword|officedocument':'word'
    },
    Modal = require('components/modal'),
    ConfirmBox = require('components/confirmBox');

class Layout{

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
            blur: false,
            notification: null, //{ text: '', type: 'info' }
            files:[]
        };
    }

    render() {
        var cx = React.addons.classSet,
            cxAdmin = cx({'admin': true, 'blur': this.state.blur}),
            cxSidebar = cx({
               'hide': !this.state.isSidebarVisible 
            }),
            cxMain = cx({
                'shift': this.state.isSidebarVisible,
                'adminMain': true,
                'blur': this.state.activeNavDropdownUid === 'more'
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
                                <label>Synopsis</label>
                                <textarea name="subtitle" value={this.state.data.subtitle} rows="5" onChange={this._onInputChange}></textarea>
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
                                                <i className="fileDelete" onClick={this._onFileCommandClick.bind(this, file, 'delete')}></i>
                                                <i className="fileCopy" onClick={this._onFileCommandClick.bind(this, file, 'copy')}></i>
                                            </span>
                                        </li>;
                                    }):null
                                }
                                </ul>
                                <input ref="fileAttach" type="file" style={{display:'none'}} onChange={this._fileChanged} />
                            </div>,
                            <div key="moreButtons" className="text-center">
                                <button className="adminUploadButton" onClick={this._onUploadClicked}><i className="flaticon-upload26"></i>Upload</button>
                                <button className="adminDeleteButton" onClick={ this._onDeleteClicked }><i className="flaticon-test20"></i>Delete</button>
                            </div>
                        ]
                    }
                }
            ];

        return (
        	<div className={cxAdmin} onClick={this._documentBodyClicked}>
                <header className={cxHeader}>
                    <i ref="toggle" className="adminSidebarToggler" onClick={this._toggleSidebar}></i>
                    {
                        this.props.model.get('isDraft') ?
                        <label className="adminHeaderLabel draft">Draft</label>
                        :null
                    }
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
                                    <li key={key} className={cxDropdown} onClick={this._toggleNavDropdown.bind(this, key)}>
                                        <div className={ 'dropdownTitle ' + key }>
                                            <i className="fa"/><span>{item.title}</span>
                                        </div>
                                        {
                                            active && item.body? (
                                            <div ref={'dropdownBody'+key} className={'dropdownBody ' + key}>{item.body}</div>
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
            item = menuItems[key];

        if(!item){
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
                    <PostList path={'/a/' + key} activePostId={this.props.model.id} type={key} /> 
                </div>
            </li>
        );
    }

    componentDidMount(){
        this._resizeActiveMenuContent();
        window.addEventListener('resize', this._onWindowResize);
        window.addEventListener('click', this._onWindowClicked);
        window.addEventListener('keydown', this._onWindowKeydown);

        if(this.props.model){
            this.props.model.on('all', this._dataModelChanged);
        }

    }

    componentWillUnmount(){
        window.removeEventListener('resize', this._onWindowResize);
        window.removeEventListener('click', this._onWindowClicked);
        window.removeEventListener('keydown', this._onWindowKeydown);

        if(this._flashTimeoutId){
            window.clearTimeout(this._flashTimeoutId);
        }       
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.model.id !== this.state.data.objectId){
           this.setState({ activeNavDropdownUid: '' });

           if(!nextProps.model.id){
            this.setState({isSidebarVisible:false});
           }
        }
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

    _renderPreviewModal(){
        var modal = Modal.open(
            <div className="adminPostModal" onClick={this._onAdminPostModelClick}>
                <i title="close" className="adminPostModalClose" onClick={e=>{e.stopPropagation();Modal.close(modal);}}></i>
                <Post post={this.props.model} />
            </div>, this._onPreviewModalClose);
        this.setState({blur: true});
    }

    _onAdminPostModelClick(e){
        e.stopPropagation();
    }

    _onPreviewModalClose(){
        this.setState({blur: false});
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


        if(~['more'].indexOf(key)){
            uid = key;
        } else if (key === 'preview'){
            this._renderPreviewModal();
        }

        if(~['publish', 'withdraw'].indexOf(key) && model.get('title').trim() && model.get('body').trim()){
            this._togglePublishStatus(!model.get('isDraft'))
        }

        this.setState({ activeNavDropdownUid: uid });
    }

    _togglePublishStatus(isDraft){

    	ConfirmBox.open({
    		title: isDraft? 'Withdraw?':'Publish?',
    		message: isDraft? 'This post will be moved to \"Drafts\". It will not be accessible publicly.': 'This post will be moved to \"Published\" and become publicly accessible',
    		confirmButtonText: isDraft? 'Withdraw': 'Publish',
            customClass:"adminConfirm",
            position:'absolute',
            top: 40,
            right:100,
            onClose:()=>{
            	this.setState({blur: false});
            },
            onConfirm:()=>{
                this.props.model[isDraft?'withdraw':'publish']();
            },
            onRender: _confirmBox => {
            	this.setState({blur: true});
            }
    	});

    }

    _toggleSidebarMenu(key, e){
        e.preventDefault();
        this.setState({ activeMenuItemUid: key});
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

            case 'destroy':
                model.set({'isDraft': null}, {silent:true});
                break;

            case 'sync':

                if(this.isMounted()){
                    newState = { isSidebarVisible: false, data:model.toJSON() };
                    if(args.length>0 && model.previous('isDraft') !== model.get('isDraft') && model.get('isDraft')){
                        this._flash('saved as draft');
                    } else{
                        newState.notification = null;
                    }
            }

                break;

            case 'error':
                if(args[0] instanceof Parse.Error){
                    this._flash(args[0].code === 101? 'post not exist, or user has no privilege to edit': args[0].message, 'error');
                }
                else{
                    this._flash('an error occurs', 'error');
                }
                break;
        }

        if(newState && this.isMounted()){
            this.setState(newState);
        }
    } 

    _flash(message, type){
        if(this.isMounted()){
            this.setState({notification:{text:message, type: type||'info'}});
        }

        this._flashTimeoutId = window.setTimeout(()=> {
            if(this.isMounted()){
                this.setState({notification:null});
            }
        }, 2000);
        
    }

    _onDeleteClicked(e){
        var dropdownBodyMoreBottom = this.refs['dropdownBodymore'].getDOMNode().getBoundingClientRect().bottom + 5,
            confirmBoxHeight,
            confirmBox,
            layoutComp = this;

        e.preventDefault();
        e.stopPropagation();

        ConfirmBox.open({
            title:"Delete Post?", 
            message:"The post will be removed if you click \"Delete\". Caution, there is no undo for this action.",
            confirmButtonText:"Delete",
            customClass:"adminConfirm",
            position:'absolute',
            right:'2%',
            onClose:onDeleteClose.bind(this),
            onConfirm:onDeleteConfirm.bind(this),
            onRender:onDeleteRender.bind(this)
        });

        function position(){
            var bodyHeight = document.body.offsetHeight;

            if(dropdownBodyMoreBottom + confirmBoxHeight < bodyHeight){
                confirmBox.setProps({top: dropdownBodyMoreBottom, bottom: null});
            } 
            else{
                confirmBox.setProps({top: null, bottom: 5});
            }

        }

        function onDeleteRender(_confirmBox){
            confirmBox = _confirmBox;
            confirmBoxHeight = confirmBox.getDOMNode().offsetHeight; 
            position();
            window.addEventListener('resize', onWindowResize);
            this.setState({blur:true});
        }


        function onDeleteClose() {
            window.removeEventListener('resize', onWindowResize);
            this.setState({blur:false});
        }

        function onDeleteConfirm() {
            var post = this.props.model,
                nextPostId = '',
                idx = -1;

            e.preventDefault();

            this.props.model.destroy().then((model) => {
                if(Array.isArray(model.get('files'))){
                    model.get('files').forEach((file) => {
                        file.destroy();
                    })
                }
                router.setRoute('/a/p/new');
            });

        };

        function onWindowResize(){
            if(onWindowResize.timeoutId){
                window.clearTimeout(onWindowResize.timeoutId);
            }
            onWindowResize.timeoutId = window.setTimeout(position, 500);
        }

    }

    _onUploadClicked(e){
        e.preventDefault();
        this.refs.fileAttach.getDOMNode().click();
    }

    _fileChanged(e){
        var file,
            post = this.props.model;

        if(e.target.files.length>0){
            file = e.target.files[0];
            e.target.value = '';

            if(!/^[\w\-\.\s]+(?:\.\w+)$/g.test(file.name)){
                this._flash('invalid file name, characters and numbers only', 'error');
                return;
            }

            this.setState({notification: {text: 'uploading', type: 'info' }});

            (new Parse.File(file.name, file))
                .save()
                .always(parseFile => {
                    this.setState({notification:null});
                    return parseFile;
                })
                .fail(error => {
                    this._flash(error);
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

    _onFileCommandClick(file, type){
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

    _onInputChange(e){
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

    _onWindowClicked(e){
        this._resetDrawnMenus();
    } 

    _onWindowKeydown(e){
       if((e.which || e.keyCode) === 27){
        this._resetDrawnMenus();
       } 
    }

    _onWindowResize(){
       this._resizeActiveMenuContent(); 
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