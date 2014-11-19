var PostModel = require('./model');

var PostCollection = Parse.Collection.extend({
    model: PostModel,

    fetchHomeList(numToSkip) {
        var query = new Parse.Query(PostModel);
        numToSkip = numToSkip ? numToSkip : 0;
        query.descending('createdAt');
        return query.find().done((posts)=>{
        	this.add(posts);
        });
    }

});

module.exports = PostCollection;
