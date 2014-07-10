/**
 * Post Model
 **/

define(['backbone'], function(backbone) {
    return backbone.Model.extend({
        defaults: {
            title: '',
            body: '',
            postedOn: null,
            createdOn: null,
            modifiedOn: null,
            createdBy: '',
            modifiedBy: ''
        }
    });
});