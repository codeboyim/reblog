var PostModel = Parse.Object.extend({
    className: 'Post',

    defaults: {
        title: '',
        body: '',
        seoUrl:'',
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

    save(...args){
        this.trigger('save', this);
        Parse.Object.prototype.save.apply(this, args);
    }
});
module.exports = PostModel;