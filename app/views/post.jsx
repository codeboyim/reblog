/**
 * @module post view
 */
define(['backbone', 'react', '../models/Post', '../models/PostCollection'], function(Backbone, React, PostModel, PostCollection) {
    
    var Post = React.createClass({
    
        getInitialState: function(){
            return {preview:false};
        },
        closePreview:function(){
            this.setState({preview:false});
        },
        renderForEdit:function(){
            var post = this.props.post;
            return (
                <div className='post-detail edit'>
                    <form>
                    <input type="text" defaultValue={post.get('title')} />
                    </form>
                </div>
            );
        },
        renderForView:function(){
            var post = this.props.post;
            return (
                <div className={'post-detail'+(this.state.preview?' preview':'')}>
                    <article key={post.get('id')} className="post">
                        <header>
                            <h1>{post.get('title')}</h1>
                            <p><time></time></p>
                        </header>
                        <div dangerouslySetInnerHTML={{__html:post.get('body')}}/>
                    </article>
                    {this.state.preview?<div><button onClick={this.closePreview}>Close</button></div>:null}
                </div>
            );
        },
        render: function(){
            
            return (
            <div>
                {this.props.editMode&&!this.state.preview?this.renderForEdit():this.renderForView()}
            </div>
            );
            
        }
    });

    return Backbone.View.extend({
    
    /**
     *@typedef PostViewInitHash
     *@type {object}
     *@property {boolean=} editMode - indicate if post's in edit
     */
     
    /**
     * @param {PostViewInitHash=} options
     */
        initialize: function(options) {
            this.editMode = !!options.editMode;
            this.model = new PostModel(options.model || {});
            this.model.on('all', _.bind(this.render, this));            
        },
        
        render: function() {            
            React.renderComponent(
                <Post editMode={this.editMode} post={this.model} />,
                this.el);
            
            return this.$el;
        }
    });
});