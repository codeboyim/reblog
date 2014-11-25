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
    '/p/:seoUrl': (seoUrl) => {
        require(['home/post'], (post) => {
            post(seoUrl);
        });
    },
    '/a': {

        '/p': {
            '\/?(\\w*)': [requireAuth, (id) => {

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

        on: () => {
            router.setRoute('/a/p/new');
        }
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
        anchor = e.target,
        href;

    while (anchor !== document.body && anchor.tagName !== 'A') {
        anchor = anchor.parentNode;
    }

    if (anchor.tagName === 'A' && /^\/.*/.test(href = anchor.getAttribute('href'))) {
        e.preventDefault();
        router.setRoute(href);
    }
})

module.exports = router;
