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
        '/drafts': {
            '\/?(\\w*)': (id) => {
                console.log('drafts', id)
                require(['admin'], (admin) => {
                    admin('drafts', {
                        id: id
                    });
                })
            }
        },
        '/new': () => {
            console.log('new');
            require(['admin'], (admin) => {
                admin('new');
            })
        },
        '/published': {

            '\/?(\\d*)': (page) => {
                console.log('published', page);
                require(['admin'], (admin) => {
                    admin('published', {
                        page: page
                    });
                })
            },

            '\/?(\\w*)': (id) => {

                console.log('published', page);
                require(['admin'], (admin) => {
                    admin('published', {
                        id: id
                    });
                })
            },
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
