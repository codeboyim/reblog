define(['react', 'parse', 'underscore', 'models/PostCollection'], function(React, Parse, _, PostCollection){


    var exports = React.createClass({
        getInitialState:function(){
            return { posts:null};
        },
        componentWillMount:function(){
            this.posts = new PostCollection;
            this.posts.on('sync', _.bind(this._postsChanged, this));
        },
        componentDidMount:function(){
            this.posts.fetch();
        },
        
        render: function(){

            return (<section>
                        <header>
                            <h3>Posts</h3>
                        </header>
                        <ul role="list">
                            {_.map(this.state.posts, function(post){
                                return <li key={post.id}><a href={"#admin/posts/"+post.id}>{post.get('title')}</a></li>;
                            })}
                        </ul>
                    </section>);

        },
        
        _postsChanged:function(){
            if(this.isMounted()){
                this.setState({posts:this.posts.models});
            }
        }

    });
    
    return exports;

});