var PostCollection = require('../models/PostCollection'),
    React = require('react'),
    _ = require('underscore'),
    converter = new (require('showdown').converter)(),
    Layout = require('shared/_layout');

module.exports = React.createClass({

    getInitialState: function(){
        return { posts: [] }
    },
    
    componentDidMount: function(){

        (new PostCollection).fetch().done(_.bind(function(posts){
            
            if(this.isMounted()){
                this.setState({posts:posts});
            }
            
        }, this));
    },
    
    render: function() {
        var self = this;
        return (
        <Layout>
        {this.state.posts.map(
            function(post){
                return (
                    <article key={post.id} className="post">
                        <header>
                            <h1>{post.get('title')}</h1>
                            <p><time></time></p>
                        </header>
                        <main>
                            <div dangerouslySetInnerHTML={{__html:converter.makeHtml(post.get('body'))}}/>
                        </main>
                    </article>
                );
        })}
        </Layout>
        );

    }
});

    