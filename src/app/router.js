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
            home.render();
        });
    },
    '/p/:seoUrl': (seoUrl) => {
        require(['home/post'], (post) => {
            post.default(seoUrl);
        });
    },
    '/a': {

        '/p': {
            '\/?(\\w*)': [requireAuth, (id) => {

                if (id === 'new') {
                    id = '';
                }

                require(['admin'], (admin) => {
                    admin.render('post', {
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
            login.default(routeBeforeLogin);
        });
    },
    '/404': () => {
        require(['404'], notFound => {
            // notFound();
        });
    }
};

router = require('director').Router(appRoutes).configure({
    notfound: () => router.setRoute('/404')
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
