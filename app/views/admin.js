define(['react', 'globals', 'jsx!./jsx/admin'], function(React, globals, Admin) {
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

        this._reactComponent = React.renderComponent(Admin({
            area: options.area
        }), this.container);

    };

    exports.prototype.setArea = function(area) {
        this._reactComponent.setProps({
            area: area
        });
    };

    exports.prototype.unload = function() {
        React.unmountComponentAtNode(this.container);
        globals.events.trigger(globals.EVENT.viewUnloaded, this);
    }

    return exports;
});