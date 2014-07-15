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
                        <article key={post.get('id')} className="post">
                            <header>
                                <h1>{post.get('title')}</h1>
                                <p><time></time></p>
                            </header>
                            <div dangerouslySetInnerHTML={{__html:post.get('body')}}/>
                            {self.props.editable?<div><a href={"#posts/"+post.get('id')+'/edit'}>Edit</a><button>Delete</button></div>:null}
                        </article>
                    );
            })}
            </div>
            );
            
        }
    });

    return Backbone.View.extend({
        initialize: function(options) {
            this.posts = new PostCollection();
            this.posts.fetch();
            this.editable = !!(options&&options.editable);
        },

        render: function() {
            React.renderComponent(
                <PostList posts={this.posts} editable={this.editable} />,
                this.el);
            
            return this.$el;
        }
    });
});