var Home = require('./components/home'),
    Layout = require('shared/_layout');


module.exports = function(...args){
    require('./me.css');
    React.renderComponent(<Layout><Home/></Layout>, document.body);
}