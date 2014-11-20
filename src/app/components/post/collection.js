var PostModel = require('./model');

var PostCollection = Parse.Collection.extend({
    model: PostModel,

    fetchHomeList(numToSkip) {
        var query = new Parse.Query(PostModel);
        numToSkip = numToSkip ? numToSkip : 0;
        query.descending('createdAt').equalTo('isDraft', false).limit(10).skip(numToSkip).include('files');
        return query.find().done((posts)=>{
        	this.add(posts);
        });
    }

});

module.exports = PostCollection;
