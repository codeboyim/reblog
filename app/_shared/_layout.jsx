

module.exports = React.createClass({

    mixins:[require('../mixins/ListenToAuthStatusChanged')],

    getInitialState(){
        return {authenticated: !!Parse.User.current(), hover:false}
    },
    
    componentDidUpdate(){
        $(window)[this.state.hover?'on':'off']('click', this.windowClicked);
    },
    
    componentDidMount(){
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/all.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    },
    
    render(){
        var cx = React.addons.classSet,
            CSSTransitionGroup = React.addons.CSSTransitionGroup,
            navDropDownItems = [<li key="profile"><a href="#me">Profile</a></li>,
                                <li key="logout"><a href="javascript:void(0);" onClick={this.logoutClicked}>Log out</a></li>];
        
        if(Parse.User.current() && Parse.User.current().admin){
            navDropDownItems.unshift(<li key="admin"><a href="#admin">Admin</a></li>);
        }
        
    
        return (
            <div className="root">
                <div id="fb-root"></div>
                <div className="fixed contain-to-grid">
                    <nav className="top-bar" role="navigation">
                        <ul className="title-area">
                            <li className="name"><h1 className="left site-logo-name"><a href="#">re/blog</a></h1></li>
                        </ul>
                        <section className="top-bar-section">
                            <ul className="right">
                                {this.state.authenticated?
                                <li ref="liDropdown" className={cx({'has-dropdown':true, 'hover':true})} onClick={this.dropdownClicked}>
                                    <a href="javascript:void(0);" ref="buttonName">{Parse.User.current().get('name')}</a>
                                    <CSSTransitionGroup transitionName="topbarNavDropDown" component={React.DOM.div}>
                                    {this.state.hover?
                                        <ul key="navDropDown" className="dropdown topbarNavDropDown">
                                            {navDropDownItems}
                                        </ul>:null}
                                    </CSSTransitionGroup>
                                </li>
                                :null}
                            </ul>
                        </section>
                    </nav>
                </div>
                <main>
                    <div id="site-content" className="row">
                        {this.props.children}
                    </div>
                </main>
                <footer></footer>
                <div id="rootModalWrap"></div>
                <script src="lib/vendors/fastclick/lib/fastclick.js"></script>
            </div>
        );
    },
    
    
    logoutClicked(e){
        e.preventDefault();
        Parse.User.logOut();
        globals.broadcast(globals.EVENT.authStatusChanged, false);
    },
    
    dropdownClicked(){
        this.setState({hover:!this.state.hover});
    },
    
    windowClicked(e){
        
        if(this.refs.liDropdown && e.target!==this.refs.liDropdown.getDOMNode() && !$.contains(this.refs.liDropdown.getDOMNode(), e.target)){
            this.setState({hover:false});
        }
    }
});