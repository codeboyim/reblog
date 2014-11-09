module.exports = Parse.Object.extend({
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
    }
});
