/**
 * @module post view
 */
define(['backbone', 'react', '../models/Post', '../models/PostCollection', 'moment'], function(Backbone, React, PostModel, PostCollection, moment) {
    
    var Post = React.createClass({
    
        getInitialState: function(){
            return _.extend({preview:false, post:this.props.post.toJSON()} );
        },
        componentWillReceiveProps:function(newProps){
            this.setState({post:newProps.post.toJSON()});
        },
        closePreview:function(){
            this.setState({preview:false});
        },
        openPreview:function(e){
            e.preventDefault();
            this.setState({preview:true});
        },
        postPropChanged:function(e){
            var post = this.state.post,
                val = e.target.value,
                name = e.target.name;
            
            post[name]=val;
            this.props.post.set(post, {silent:true});
            this.setState({post:post});
        },
        formSubmitted:function(e){
            var submitButton=this.refs.submit.getDOMNode();
            e.preventDefault();
            submitButton.disabled=true;
            this.props.post.save().always(function(){
               submitButton.disabled=false;
            });
        },
        renderForEdit:function(){
            var post = this.state.post;
            return (
                <div className='post-detail edit'>
                    <form onSubmit={this.formSubmitted}>
                        <div>
                            <input name="title" type="text" value={post.title} onChange={this.postPropChanged} />
                        </div>                        
                        <div>
                            <textarea name="body" value={post.body} onChange={this.postPropChanged}/>
                        </div>
                        <div>
                            <input name="postedOn" type="datetime-local" value={post.postedOn} onChange={this.postPropChanged}/>
                        </div>
                        <div>
                            <input ref="submit" type="submit" value="Save"/>
                            <button onClick={this.openPreview}>Preview</button>
                        </div>
                    </form>
                </div>
            );
        },
        renderForView:function(){
            var post = this.state.post;
            return (
                <div className={'post-detail'+(this.state.preview?' preview':'')}>
                    <article key={post.id} className="post">
                        <header>
                            <h1>{post.title}</h1>
                            <p><time></time></p>
                        </header>
                        <div dangerouslySetInnerHTML={{__html:post.body}}/>
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
        tagName:'div',
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
            this.listenTo(this.model, 'all', _.bind(this.render, this))
            this.attachTo = options.attachTo;
        },
        
        render: function() {            
            React.renderComponent(
                <Post editMode={this.editMode} post={this.model} />,
                this.el);
            this.attachTo.append(this.$el);
            return this.$el;
        }
    });
});