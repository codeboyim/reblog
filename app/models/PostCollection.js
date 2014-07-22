/**
 * @module post collection
 */
define(['parse', './Post'], function(Parse, Post) {

    return Parse.Collection.extend({
        model: Post
    });
});