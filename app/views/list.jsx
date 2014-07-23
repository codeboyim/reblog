/**
 * @module list view
 */
define(['backbone', 'underscore', 'react', '../models/PostCollection'], function(Backbone, _, React, PostCollection) {

    var PostList = React.createClass({
        deleteClick: function(post, e) {
            var self = this;
            
            post.destroy({wait:true}).done(function(){
                self.props.posts.fetch();
            });
        },
        render: function() {
            var self = this;
            return (
            <div>
            {this.props.posts.map(
                function(post){
                    return (
                        <article key={post.id} className="post">
                            <header>
                                <h1>{post.get('title')}</h1>
                                <p><time></time></p>
                            </header>
                            <div dangerouslySetInnerHTML={{__html:post.get('body')}}/>
                            {self.props.editable?
                                <div>
                                    <a href={"#posts/"+post.id+'/edit'}>Edit</a>
                                    <button onClick={_.bind(self.deleteClick, self, post)}>Delete</button>
                                </div>
                                :null}
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
        this.router = options.router;
    };
    
    PostListView.prototype.render = function(){
    
        return React.renderComponent(
                <PostList posts={this.posts} editable={this.editable} />,
                this.attachTo);
    };
    
    
    return PostListView;

    
});