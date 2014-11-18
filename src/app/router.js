var router,
    routeBeforeLogin;

function requireAuth() {
    if (!Parse.User.current()) {
        routeBeforeLogin = router.getRoute().join('/');
        router.setRoute('/login');
        return false;
    }
}
var appRoutes = {
    '/': () => {
        require(['home'], (home) => {
            home();
        });
    },
    '/p/:title': (title) => {
        require(['home'], (home) => {
            home(title);
        });
    },
    '/a': {

        '/p': {
            '\/?(\\w*)': [requireAuth, (id) => {
                console.log('p');
                if (id === 'new') {
                    id = '';
                }

                require(['admin'], (admin) => {
                    admin('post', {
                        id: id
                    });
                })
            }]
        },

    },
    '/login': () => {
        require(['login'], login => {
            login(routeBeforeLogin);
        });
    }
};

router = require('director').Router(appRoutes).configure({
    notfound: () => console.log('not found')
});
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

module.exports = router;
