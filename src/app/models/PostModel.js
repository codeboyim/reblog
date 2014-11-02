module.exports = Parse.Object.extend({
    className: 'Post',
    
    defaults: {
        title: '',
        body: '',
        postedOn: null,
        createdBy: '',
        modifiedBy: '',
        panelImage: null,
        sideImage: null
    },
    
    validate(attrs, options){
        var msg = [];
        
        if(!attrs.body.trim()){
            msg.push('body required');
        }
    }
});