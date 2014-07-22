/**
 * Post Model
 **/

define(['parse'], function (Parse) {
    return Parse.Object.extend({
        className: 'Post',
        defaults: {
            title: '',
            body: '',
            postedOn: null,
            createdBy: '',
            modifiedBy: ''
        }
    });
});