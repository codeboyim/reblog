var Home = require('./components/home'),
    Layout = require('shared/_layout');


module.exports = function(...args){
    React.renderComponent(<Layout><Home/></Layout>, document.body);
}