var TopNav = require('./_topNav');

module.exports = React.createClass({
    render(){
        return (
            <div className="root">
                <div id="fb-root"></div>
                <div className="fixed contain-to-grid">
                    <header className="top-bar">
                        <h1 className="left site-logo-name">re/blog</h1>
                        <div id="header-nav" className="right"><TopNav /></div>
                    </header>
                </div>
                <main>
                    <div id="site-content" className="row">
                        {this.props.children}
                    </div>
                </main>
                <footer></footer>
                <script src="lib/vendors/fastclick/lib/fastclick.js"></script>
            </div>
        );
    }
});