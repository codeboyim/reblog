/**
 * @module list view
 */
define(['backbone', 'react', '../models/PostCollection'], function(Backbone, React, PostCollection) {
    
    var PostList = React.createClass({
        render: function(){
            var self = this;
            return (
            <div>
            {this.props.posts.map(
                function(post){
                    return (
                        <article key={post.id} className="post">
                            <header>
                                <h1>{post.title}</h1>
                                <p><time></time></p>
                            </header>
                            <div dangerouslySetInnerHTML={{__html:post.body}}/>
                            {self.props.editable?<div><a href={"#posts/"+post.id+'/edit'}>Edit</a><button>Delete</button></div>:null}
                        </article>
                    );
            })}
            </div>
            );
            
        }
    });
    
    
    var PostListView = function(options){
        this.editable = !!(options&&options.editable);
        this.attachTo= options.attachTo;
        this.posts = new PostCollection();
        _.extend(this, Backbone.Events).listenTo(this.posts, 'all', _.bind(this.render, this));
        this.posts.fetch();
    };
    
    PostListView.prototype.render = function(){
    
        return React.renderComponent(
                <PostList posts={this.posts.toJSON()} editable={this.editable} />,
                this.attachTo);
    };
    
    
    return PostListView;

    
});