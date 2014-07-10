/**
 * @module list view
 */
define(['backbone', 'react', '../models/PostCollection'], function(Backbone, React, PostCollection) {
    
    var PostList = React.createClass({
        render: function(){
            return (
            <div>
            {this.props.posts.map(
                function(post){
                    return (
                        <article key={post.get('id')} className="post">
                            <header>
                                <h1>{post.get('title')}</h1>
                                <p><time></time></p>
                            </header>
                            <div dangerouslySetInnerHTML={{__html:post.get('body')}}>
                            </div>
                        </article>
                    );
            })}
            </div>
            );
            
        }
    });

    return Backbone.View.extend({
        initialize: function() {
            this.posts = new PostCollection();
            this.posts.fetch();
        },

        render: function() {
            React.renderComponent(
                <PostList posts={this.posts} />,
                this.el);
            
            return this.$el;
        }
    });
});