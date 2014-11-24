require('./style.scss');

class HomeLayout {

    getInitialState() {
        return {
            hidden: true,
            authenticated: !!Parse.User.current()
        };
    }

    render() {
        return (
            <div className="root">
                <header className="rootHeader">
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

}

module.exports = React.createClass(HomeLayout.prototype);