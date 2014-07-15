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
            
            switch (method) {
                case 'read':

                    $.Deferred(function(d) {

                        d.resolve(_.find(_posts,
                            function(p) {
                                return p.id === model.get('id');
                            }
                        ));

                    }).promise().done(function(post) {
                        model.set(post);
                    });

                    break;

                default:
                    break;

            }
            
        }

    };

});