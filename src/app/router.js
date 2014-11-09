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
        '/new': () => {
            require(['admin'], (admin) => {
                admin('new');
            })
        },
        '/posts': {
            '\/?(\d*)': (page) => {
                require(['admin'], (admin) => {
                    admin('posts', page);
                })
                console.log('admin posts');
            }
        },
        '/drafts': () => {
            require(['admin'], (admin) => {
                admin('drafts');
            })
            console.log('admin drafts');
        }
    },
    '/signin': () => {}
};

var router = require('director').Router(appRoutes).configure({
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
