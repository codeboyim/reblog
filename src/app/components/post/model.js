var PostModel = Parse.Object.extend({
    className: 'Post',

    defaults: {
        title: '',
        body: '',
        seoUrl: '',
        isDraft: true,
        files: null
    },

    reset(...args) {
        args = args || [];
        this.clear({
            silent: true
        });
        delete this.id;
        args.unshift(this.defaults);
        this.set.apply(this, args);
        return this;
    },

    save(...args) {
        this.trigger('save', this);
        return Parse.Object.prototype.save.apply(this, args);
    }

});

PostModel.findDrafts = function() {
    var query = new Parse.Query(PostModel);

    query.select('title')
        .equalTo('isDraft', true)
        .descending('createdAt');

    return query.find();
}

PostModel.findPublished = function() {
    var query = new Parse.Query(PostModel);

    query.select('title')
        .equalTo('isDraft', false)
        .descending('createdAt');

    return query.find();
}
module.exports = PostModel;
