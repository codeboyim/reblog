var AttachmentModel = Parse.Object.extend({
    className: 'Attachment',
    defaults: {
    	name: '',
    	type: '',
    	file: null
    }
});

module.exports = AttachmentModel;
