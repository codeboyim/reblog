var PostModel = Parse.Object.extend({
    className: 'Post',

    defaults: {
        title: '',
        body: '',
        seoUrl: '',
        isDraft: true
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
        this.unset('insertText', {
            silent: true
        });
        this.trigger('save', this);
        return Parse.Object.prototype.save.apply(this, args);
    },

    files(){
        return this.relation('files').query().find();
    },

    addFile(file){
        this.relation('files').add(file);
        return this;
    },

    removeFile(file){
        this.relation('files').remove(file);
        file.destroy();
        return this;
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
