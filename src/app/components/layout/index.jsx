require('./style.scss');

class HomeLayout {

    getInitialState() {
        return {
            hideHeader: false,
            authenticated: !!Parse.User.current()
        };
    }

    render() {
        var cx = React.addons.classSet,
            cxHeader = cx({'rootHeader': true, 'hide': this.state.hideHeader});
        return (
            <div className="root" ref="root" >
                <header className={cxHeader}>
                    <a href="/"><h1>Re/blog</h1></a>
                    <a href="/a/p/new" title="write a new post" className="rootHeaderButton add flaticon-plus72"></a>
                </header>
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
        this.refs.root.getDOMNode().addEventListener('scroll', this._rootScroll());
    }

    _rootScroll(){
        var busy = false,
            lastScrollTop = 0,
            up = false;

        return (e) =>{
            var target = e.target;
            if(!busy){

                    var scrollTop = target.scrollTop;
                    up = scrollTop - lastScrollTop > 0;
                    console.log(scrollTop, lastScrollTop);
                    lastScrollTop = scrollTop;
                busy = true;
                window.setTimeout(() => {
                    busy = false;
                    this.setState({'hideHeader':up});
                }, 60);
            }

        };
    }
}

module.exports = React.createClass(HomeLayout.prototype);