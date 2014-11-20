var AttachmentModel = require('components/attachment/model');

var PostModel = Parse.Object.extend({
    className: 'Post',

    defaults: {
        title: '',
        body: '',
        subtitle: '',
        seoUrl: '',
        isDraft: true,
        files:[]
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

    fetch(...args){
        var query = new Parse.Query(PostModel);
        query.include('files').get(this.id).then(post=>{
            this.set(post.toJSON(), {silent:true});
            this.set({files:post.get('files')}, {silent:true});
            this.trigger('sync', this);
        });
    },

    save(...args) {
        this.unset('insertText', {
            silent: true
        });
        this.trigger('save', this);
        return Parse.Object.prototype.save.apply(this, args);
    },

    delaySave(delay) {
        delay = delay || 2000;
        
        if(this.delaySave.timeoutId){
            window.clearTimeout(this.delaySave.timeoutId);
        }

        this.delaySave.timeoutId = window.setTimeout(() => {
            this.save();
        }, delay);
    },

    addFile(file){
        this.get('files').push(file);
        this.save();
        return this;
    },

    removeFile(file){
        var files = this.get('files'),
            idx = files.indexOf(file);

        file.destroy().then(() => {
            if(~idx){
                files.splice(idx, 1);    
                this.save();
            }
        });

        return this
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
