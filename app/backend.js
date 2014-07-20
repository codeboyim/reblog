/**
 *@module backend
 */

define(['backbone', 'underscore', 'jquery', 'text!./data/posts.json'], function (backbone, _, $, posts) {
    var _posts = JSON.parse(posts);

    backbone.sync = function (method, model) {

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

                return $.Deferred(function (d) {

                    var post = _.find(_posts,
                        function (p) {
                            return p.id === model.get('id');
                        }
                    );
                    model.set(post);
                    d.resolve(model);

                }).promise();

            case 'update':

                return $.Deferred(function (d) {

                    var post = _.find(_posts, function (p) {
                        return p.id === model.get('id');
                    });

                    _.extend(post, model.toJSON(), {
                        modifiedOn: new Date()
                    });

                    model.set(post);
                    d.resolve(model);

                }).promise();

            case 'create':

                return $.Deferred(function (d) {
                    var post = {};
                    _.extend(post, model.toJSON(), {
                        id: _posts[_posts.length - 1].id + 1,
                        createdOn: new Date()
                    });
                    
                    _posts.push(post);
                    
                    model.set(post);
                    d.resolve(model);

                }).promise();

            case 'delete':

                return $.Deferred(function (d) {

                    var post = _.find(_posts, function (p) {
                        return p.id === model.get('id');
                    });

                    _posts.splice(_posts.indexOf(post), 1);

                    d.resolve(model);

                }).promise();

            default:
                break;

            }

        }

    };

});