define(['react', 'underscore'], function(React, _){

    var exports = React.createClass({
        
        componentWillMount:function () {
            _.bindAll(this, '_postsChanged');
            this.props.posts.on('sync', this._postsChanged);
        },
        deleteClick: function(post, e) {
            var self = this;
            
            post.destroy({wait:true}).done(function(){
                self.props.posts.fetch();
            });
        },
        _postsChanged: function(){
            this.setProps({posts:this.props.posts});
        },
        render: function() {
            var self = this;
            return (
            <article>
            {this.props.posts.map(
                function(post){
                    return (
                        <article key={post.id} className="post">
                            <header>
                                <h1>{post.get('title')}</h1>
                                <p><time></time></p>
                            </header>
                            <main>
                                <div dangerouslySetInnerHTML={{__html:post.get('body')}}/>
                            </main>
                        </article>
                    );
            })}
            </article>
            );
            
        }
    });
    
    return exports;
});