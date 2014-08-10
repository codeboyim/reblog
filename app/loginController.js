define(['react', 'parse', 'underscore', 'globals', 'jsx!views/login'], function (React, Parse, _, globals, Login) {

    /**
     *@constructor
     *@this router
     */
    var exports = (function () {

        function onLoggedIn(returnUrl) {
            this.navigate(returnUrl || '', {
                trigger: true
            });
            globals.events.trigger(globals.EVENT.authStatusChanged, true);
        }

        return function (returnUrl) {

            if (Parse.User.current()) {
                this.navigate(returnUrl || '', {
                    trigger: true
                });
            } else {
                React.renderComponent(Login({
                    onLoggedIn: _.bind(onLoggedIn, this, returnUrl)
                }), document.getElementById('site-content'));
            }
        };
    })();

    return exports;
});