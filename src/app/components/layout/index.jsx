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
        this.refs.root.getDOMNode().addEventListener('scroll', this._rootScroll);
    }

    componentWillReceiveProps(nextProps){
        this.setState({ authenticated: !!Parse.User.current(), hideHeaderDropdownMenu: true });
    }

    componentWillUnmount(){
        this.refs.root.getDOMNode().removeEventListener('scroll', this._rootScroll);
    }

    _rootScroll(e){
        var busy = this._rootScroll.busy || false,
            lastScrollTop = this._rootScroll.lastScrollTop || 0,
            up = false,
            target = e.target,
            scrollTop = target.scrollTop;

        if(!busy){
            up = scrollTop - lastScrollTop > 0;
            this._rootScroll.lastScrollTop = scrollTop;
            this._rootScroll.busy = true;

            if(this.state.hideHeader && !up || !this.state.hideHeader && up){
                window.setTimeout(() => {
                    this._rootScroll.busy = false;
                    this.setState({'hideHeader':up});
                }, 60);
            }
            else{
                this._rootScroll.busy = false;
            }
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