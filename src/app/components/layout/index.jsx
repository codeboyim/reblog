var Dropdown = require('components/dropdown');
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
                <div className={cxHeader}>
                    <header>
                        <a href="/"><h1>Re/blog</h1></a>
                        <span className="rootHeaderDropdown">
                            <a className="rootHeaderButton add flaticon-plus72"></a>
                            <Dropdown>
                                <div>
                                    <a href="/a/p/new" title="write a new post">Write a new post</a>
                                </div>
                                <div>
                                    <span>Log out</span>
                                </div>
                            </Dropdown>
                        </span>
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
        this.refs.root.getDOMNode().addEventListener('scroll', this._rootScroll());
    }

    _rootScroll(){
        var busy = false,
            lastScrollTop = 0,
            up = false;

        return (e) =>{
            var target = e.target,
                scrollTop = target.scrollTop;
            if(!busy){
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