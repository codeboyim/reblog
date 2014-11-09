var Layout = React.createClass({

    render() {
        var menuItems = this.props.menuItems.map((menuItem)=>{
            return (
                <li key={menuItem.uid} className={menuItem.uid===this.props.activeMenuItemUid?'active':''}>
                    <a href={menuItem.href}>{menuItem.text}</a>
                </li>);
            }),
            cx = React.addons.classSet,
            cxSidebar = cx({
               'hide': !this.state.isSidebarVisible 
            }),
            cxMain = cx({
                'shift': this.state.isSidebarVisible
            });

        return (
        	<div className="admin" onClick={this._documentBodyClicked}>
                <aside className={cxSidebar} ref="adminSidebar">
                    <i onClick={this._toggleSidebar}>{this.state.isSidebarVisible?'hide':'show'}</i>
                    <ul>
                        {menuItems}
                    </ul>
                </aside>
                <main className={cxMain}>
            		{this.props.children}
        		</main>
          </div>
        );
    },

    getDefaultProps(){
        return {
            activeMenuItemUid:'new',
            menuItems:[
                {uid: 'home', href:'/', text:'Home'},
                {uid: 'new', href:'/a/new', text:'New post'},
                {uid: 'posts', href: '/a/posts', text:'Post'},
                {uid: 'drafts', href: '/a/drafts', text:'Drafts'}
            ] 
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