var appRoutes = {
    '/': function() {
        require(['home'], function() {

        });
    },
    '/signin':function(){
    	console.log('login');
    }
};

var router = require('director').Router(appRoutes);
router.init('/');

document.body.addEventListener('click', function(e) {
    var url = document.location.origin + document.location.pathname,
        hash = '',
        href = e.target.getAttribute('href');

    if (e.target.tagName === 'A' && /^\/.*/.test(href)) {
        e.preventDefault();
        router.setRoute(href);
    }
})
