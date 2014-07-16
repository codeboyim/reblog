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

    return Backbone.View.extend({
        initialize: function(options) {
            this.posts = new PostCollection();
            this.posts.fetch();
            this.editable = !!(options&&options.editable);
            this.attachTo= options.attachTo;
        },

        render: function() {
            React.renderComponent(
                <PostList posts={this.posts.toJSON()} editable={this.editable} />,
                this.el);
                
            this.attachTo.append(this.$el);
            return this.$el;
        }
    });
});