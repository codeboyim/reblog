var PostModel = require('./model');

var PostCollection = Parse.Collection.extend({
    model: PostModel,

    initialize(){
    	this._allLoaded = false;
    },

    fetchHomeList(numToSkip) {
        var query = new Parse.Query(PostModel);
        numToSkip = numToSkip === null || numToSkip === undefined ? this.length : numToSkip;
        query.descending('createdAt').equalTo('isDraft', false).limit(10).skip(numToSkip).include('files');
        return query.find().done((posts)=>{
        	this.add(posts);

        	if(posts.length === 0 || posts.length < 10){
        		this._allLoaded = true;
        	}
        });
    },

    getAllLoaded(){
    	return this._allLoaded;
    }

});

module.exports = PostCollection;
