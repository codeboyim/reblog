/**
 *@module backend
 */

define(['backbone', 'underscore', 'jquery', 'text!./data/posts.json'], function(backbone, _, $, posts) {
    var _posts = JSON.parse(posts);

    backbone.sync = function(method, model) {

        if (model.hasOwnProperty('models')) {

            switch (method) {
                case 'read':
                    model.reset(_posts);
                    break;

                default:
                    break;
            }

        } else {
            console.log(method);
            switch (method) {
                case 'read':

                    return $.Deferred(function(d) {

                        d.resolve(_.find(_posts,
                            function(p) {
                                return p.id === model.get('id');
                            }
                        ));

                    }).promise().done(function(post) {
                        model.set(post);
                    });

                case 'update':

                    return $.Deferred(function(d) {

                        setTimeout(function() {
                            model.set({
                                modifiedOn: new Date()
                            });
                            d.resolve(model.toJSON());
                        }, 1500);

                    }).promise().done(function(post) {
                        model.set(post);
                    });

                default:
                    break;

            }

        }

    };

});