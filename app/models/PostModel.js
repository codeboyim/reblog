/**
 * Post Model
 **/

module.exports = require('parse').Object.extend({
    className: 'Post',
    defaults: {
        title: '',
        body: '',
        postedOn: null,
        createdBy: '',
        modifiedBy: '',
        panelImage: null,
        sideImage: null
    }
});