/**
 *@module backend
 */

define(['backbone', 'text!./data/posts.json'], function(backbone, posts) {
    var _posts = JSON.parse(posts);

    backbone.sync = function(method, model) {

        if (model.hasOwnProperty('models')) {
            switch (method) {
                case 'read':
                    model.reset(_posts);
                    break;
            }
        }

    }

});