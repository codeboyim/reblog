define(['react', 'underscore', 'jquery', 'models/post'], function(React, _, $, PostModel){

    var exports = React.createClass({
    
        getInitialState: function(){
            return {post:new PostModel({id:this.props.id}), ajaxing:false}
        },
        
        componentWillMount: function(){
            _.bindAll(this, 'postModelChanged');
            this.state.post.on('all', this.postModelChanged);
        },
        
        componentDidMount: function (){
            this.setState({ajaxing:true});
            
            this.state.post.fetch().always(_.bind(function (){
                this.setState({ajaxing: false});
            }, this));
            
            //$(this.getDOMNode()).foundation();
        },
 
        postPropChanged:function(e){
            this.state.post.set(e.target.name, e.target.value);
        },
        
        postModelChanged: function(){
            this.forceUpdate();
        },
        
        formSubmitted:function(e){
            var submitButton = this.refs.submit.getDOMNode();                
            e.preventDefault();
            
            this.setState({ajaxing: true});
            
            this.state.post.save()
                .always(_.bind(function(){
                    this.setState({ajaxing: false});
                }, this));

        },
        
        openPreview:function(e){
        },

        renderEditView:function(){
            var post = this.state.post;
            
            if(!post){
                return null;
            }
            else{
                return (
                    <section>
                        <h1>Edit Post</h1>
                        <form onSubmit={this.formSubmitted}>
                            <div className="row">
                                <div className="large-12 column">
                                    <input name="title" placeholder="title" type="text" value={post.get('title')} onChange={this.postPropChanged} />
                                </div>
                            </div>                        
                            <div className="row">
                                <div className="large-12 column">
                                    <label>
                                        <textarea rows="20" className="post-edit-body" name="body" 
                                            value={post.get('body')} onChange={this.postPropChanged}/>
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="large-12 column">
                                    <input ref="submit" type="submit" className="button" value="Save" />
                                    <button onClick={this.openPreview}>Preview</button>
                                </div>
                            </div>
                        </form>
                    </section>
                );
            }
        },
        renderReadView:function(){
            var post = this.state.post;
            return (!post?
                        null:
                        <article>
                            <header>
                                <h1>{post.get('title')}</h1>
                                <p><time></time></p>
                            </header>
                            <main>
                                <div dangerouslySetInnerHTML={{__html:post.get('body')}}/>
                            </main>
                        </article>
            );
        },
        render: function(){
            if(this.props.editView){
                return this.renderEditView();
            }
            else{
                return this.renderReadView();
            }
            
        }
    });
    
    return exports;

});