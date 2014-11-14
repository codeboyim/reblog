var PostModel = Parse.Object.extend({
    className: 'Post',

    defaults: {
        title: '',
        body: '',
        seoUrl: '',
        isDraft: true,
        files: null
    },

    validate(attrs, options) {
        var msg = [];

        if (!attrs.title.trim()) {
            msg.push('title required');
        }

        if (!attrs.body.trim()) {
            msg.push('body required');
        }
    },

    reset(...args) {
        args = args || [];
        args.unshift(this.defaults);
        this.set.apply(this, args);
    },

    save(...args) {
        this.trigger('save', this);
        Parse.Object.prototype.save.apply(this, args);
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
