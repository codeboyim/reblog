import PostModel from './model';
import Backbone from 'backbone';

var PostCollection = Backbone.Collection.extend({
    model: PostModel,

    initialize() {
        this._allLoaded = false;
        this._limit = 10;
    },

    fetchHomeList(numToSkip) {
        var query = new Parse.Query(PostModel);
        numToSkip = numToSkip === null || numToSkip === undefined ? this.length : numToSkip;
        query.descending('createdAt').equalTo('isDraft', false).limit(this._limit).skip(numToSkip).include('files');
        return query.find().done((posts) => {
            posts = posts.map(p => {
                return p.toJSON();
            });
            this.add(posts);

            if (posts.length === 0 || posts.length < this._limit) {
                this._allLoaded = true;
            }
        });
    },

    fetchDrafts() {
        var query = new Parse.Query(PostModel);

        query.select('title')
            .equalTo('isDraft', true)
            .descending('updatedAt').limit(10);

        return query.find().done(posts => {
            this.reset(posts.map(p => p.toJSON()));
        });
    },

    fetchPublished() {
        var query = new Parse.Query(PostModel);

        query.select('title')
            .equalTo('isDraft', false)
            .descending('updatedAt').limit(10);

        return query.find().done(posts => {
            this.reset(posts.map(p=>p.toJSON()));
        });
    },

    getAllLoaded() {
        return this._allLoaded;
    }

});

module.exports = PostCollection;
