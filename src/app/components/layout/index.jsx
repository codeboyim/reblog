require('./style.scss');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
class HomeLayout {

    getDefaultProps(){
        return {
            postId: null
        };
    }

    getInitialState() {
        return {
            hideHeader: false,
            hideHeaderDropdownMenu: true,
            authenticated: !!Parse.User.current()
        };
    }

    render() {
        var cx = React.addons.classSet,
            cxHeader = cx({'rootHeader': true, 'hide': this.state.hideHeader});

        return (
            <div className="root" ref="root" >
                <div className={cxHeader}>
                    <header>
                        <a className="rootHeaderLogo" href="/"><h1>Re/blog</h1></a>
                        {
                            this.state.authenticated?
                            <div className="rootHeaderDropdown" 
                                onMouseEnter={this._toggleRootHeaderDropdown.bind(this, true)} 
                                onMouseLeave={this._toggleRootHeaderDropdown.bind(this, false)}>
                                <i ref="dropdownButton" className="dropdownButton"></i>
                                <ReactCSSTransitionGroup transitionName="dropdownMenu">
                                {
                                    !this.state.hideHeaderDropdownMenu?
                                    <ul className="dropdownMenu">
                                        <li>                            
                                            <a href="/a/p/new" title="write a new post">Write a new post</a>
                                        </li>
                                        { this.props.postId?
                                        <li>
                                            <a href={'/a/p/' + this.props.postId } title="edit this post">Edit this post</a>
                                        </li>
                                        :null}
                                        <li>
                                            <a href="/" onClick={this._logOutClicked} title="log out">Log out</a>
                                        </li>
                                    </ul>
                                    :null
                                }
                                </ReactCSSTransitionGroup>
                            </div>
                            :null
                        }
                    </header>
                </div>
                <div className="rootMain">
                    {this.props.children}
                </div>
                <footer className="rootFooter">
                    <span>Developed by codeboy</span>
                </footer>
          </div>
        );
    }

    componentDidMount(){
        window.addEventListener('scroll', this._onWindowScroll);
    }

    componentWillReceiveProps(nextProps){
        this.setState({ authenticated: !!Parse.User.current(), hideHeaderDropdownMenu: true });
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this._onWindowScroll);
    }

    _onWindowScroll(e){
        var callee = this._onWindowScroll,
            didScroll = callee.didScroll || false,
            lastScrollTop = callee.lastScrollTop || 0,
            hide = false,
            show = false,
            scrollDist = 0,
            scrollTop;

        if(!didScroll){
            callee.didScroll = true;

            window.setTimeout(() => {
                scrollTop = document.body.scrollTop;
                scrollDist = scrollTop - lastScrollTop;
                hide = scrollDist > 0;
                show = scrollDist < -50 || scrollTop <= 0;
                callee.lastScrollTop = scrollTop;
                callee.didScroll = false;
                if(this.isMounted() && (show || hide) && (this.state.hideHeader && show || !this.state.hideHeader && hide)){
                    this.setState({'hideHeader':!show && hide});
                }
            }, 60);
        }

    }

    _toggleRootHeaderDropdown(...args){
        var hide = true,
            evt;
        if(typeof args[0] === 'boolean'){
            hide = !args[0];
        }
        else{
            evt = args[0];
        }

        if(args.length == 2){
            evt = args[1];
        }
        this.setState({ hideHeaderDropdownMenu: hide });
    }

    _logOutClicked(e){
        e.preventDefault();    
        Parse.User.logOut();
        this.setState({ authenticated: false });
    }
}

module.exports = React.createClass(HomeLayout.prototype);