define(['react', 'jsx!./jsx/admin'], function(React, Admin) {
    /**
     * @module app/admin
     */

    /**
     * @constructor
     * @param {object} options
     *        {Element} options.container
     */
    var exports = function(options) {

        this.container = options.container;

        React.renderComponent(Admin({
            area: options.area
        }), this.container);

    };

    return exports;
});