define(['react'], function(React){

    var exports = React.createClass({
    
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
    
    return exports;
});