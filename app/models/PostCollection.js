/**
 * @module post collection
 */
define(['backbone', './Post'], function(backbone, Post) {

    return backbone.Collection.extend({
        model: Post
    });
});