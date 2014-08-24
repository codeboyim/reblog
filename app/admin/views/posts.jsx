define(['react', 'parse', 'underscore', 'backbone', 'globals', 'jsx!./_layout', 'models/PostCollection'],
    function(React, Parse, _, Backbone, globals, Layout, PostCollection){


    var exports = React.createClass({

        getInitialState:function(){
            _.extend(this, Backbone.Events);
            return { posts: null};
        },
        
        componentWillMount:function(){
            this.posts = new PostCollection;
            this.posts.on('sync', _.bind(this._postsChanged, this));
        },
        
        componentDidMount:function(){
            this.posts.fetch();
        },
        
        render: function(){

            return (
                <Layout>
                    <section>
                        <header>
                            <h3>Posts</h3>
                        </header>
                        <button onClick={this._addPost}>Add a new Post</button>
                        <ul role="list">
                            {_.map(this.state.posts, function(post){
                                return <li key={post.id}><a href={"#admin/posts/"+post.id}>{post.get('title')}</a></li>;
                            })}
                        </ul>
                    </section>
                </Layout>);

        },
        
        _addPost: function(e){
            e.preventDefault(); 
            
            if(_.isFunction(this.props.onAddPostClicked)){
                this.props.onAddPostClicked();
            }
        },
        
        _postsChanged:function(){
            if(this.isMounted()){
                this.setState({posts:this.posts.models});
            }
        }

    });
    
    return exports;

});