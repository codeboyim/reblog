define(['react', 'parse', 'globals', 'jsx!./views/admin'], function (React, Parse, globals, Admin) {
    /**
     * @module app/admin
     */

    /**
     * @constructor
     * @param {object} options
     *        {Element} options.container
     */
    var exports = function (area) {

        if (!this.requireLogin('admin' + (area ? ('/' + area) : ''))) {
            return;
        }

        this.trigger(globals.EVENT.viewLoaded,
            React.renderComponent(Admin({
                area: area
            }), document.getElementById('site-content')));

    };


    return exports;
});