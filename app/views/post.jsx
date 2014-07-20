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
            var submitButton=this.refs.submit.getDOMNode(),
                isNew = this.props.post.isNew(),
                self =  this;
            e.preventDefault();
            submitButton.disabled=true;
            this.props.post.save()
                .done(function(model){
                    if(isNew){
                       self.props.view.router.navigate('posts/'+model.get('id')+'/edit', {replace:true});
                    }
                })
                .always(function(){
                    submitButton.disabled=false;
                });
        },
        backClicked:function(e){
            this.props.view.unload();
        },
        renderForEdit:function(){
            var post = this.state.post;
            return (
                <div className='post-detail edit'>
                    <a href="#posts" onClick={this.backClicked}>Back to list</a>
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
        
    var PostView = function(options){
        this.editMode = !!options.editMode;
        this.post = new PostModel();
        _.extend(this, Backbone.Events).listenTo(this.post, 'all', _.bind(this.render, this))
        this.attachTo = options.attachTo;
        this.router = options.router;
    }
    
    PostView.prototype.render = function(){
         
         return React.renderComponent(
                <Post editMode={this.editMode} post={this.post} view={this} />,
                this.attachTo);
    }
    
    PostView.prototype.unload = function(){
        this.post.clear();
        React.unmountComponentAtNode(this.attachTo);
    }
    
    return PostView;
});