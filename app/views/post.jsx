define(['globals', 'react', 'underscore', 'jquery', 'markdown', 'models/post', 'jsx!modal', '_datetimepicker'],
    
    function(globals, React, _, $, markdown, PostModel, Modal){

        var exports = Post = React.createClass({

            getInitialState: function(){
                var initialPost = this.props.post || {id:(this.props.id||0)};
                return {post:new PostModel(initialPost), ajaxing:false}
            },

            componentWillMount: function(){
                this.state.post.on('all', this.postModelChanged);
            },

            componentDidMount: function (){
                
                if(!this.props.post){
                
                    this.state.post.fetch().always(_.bind(function (){
                        this.setState({ajaxing: false});
                    }, this));

                    if(this.props.editView){
                        $('#post_postedon').datetimepicker(
                            _.extend({onChangeDateTime: this.datetimepickerChangeDateTime}, globals.SETTINGS.datetimepicker)
                        );
                    }
                }
            },

            linkedValueChanged: function(e){
                this.state.post.set(e.target.name, e.target.value);
            },

            datetimepickerChangeDateTime: function(dp, $input){
                if(moment($input.val().trim()).isValid){
                    this.state.post.set('postedOn', dp);
                }
                else{
                   this.state.post.set('postedOn', null);
                }
            },

            postModelChanged: function(event, post){
            
                if(event==='change:postedOn'){
                    $('#post_postedon').val(
                        post.get('postedOn')?post.get('postedOn').dateFormat(globals.SETTINGS.datetimepicker.format):''
                    );
                }
                
                if(this.isMounted()){
                    this.forceUpdate();
                }
            },

            buttonClicked: function(type, e){     
                e.preventDefault();

                switch(type){

                    case 'save':
                        this.setState({ajaxing: true}); 

                        this.state.post.save()
                            .done(_.bind(function(post){
                                    
                                    if(this.props.onSaved && _.isFunction(this.props.onSaved)){
                                        this.props.onSaved(post.toJSON());
                                    }

                                }, this)
                            )
                            .always(_.bind(function(){

                                    if(this.isMounted()){
                                        this.setState({ajaxing: false});
                                    }

                                }, this)
                            );
                        
                        
                        break;

                    case 'preview':
                        Modal.open(<Post post={this.state.post.toJSON()} />);
                        break;

                }
            },

            renderEditView:function(){
                var post = this.state.post;

                if(!post){
                    return null;
                }
                else{
                    return (
                        <section>
                            <h3>Edit Post</h3>
                            <div className="row">
                                <div className="large-12 column">
                                    <input name="title" placeholder="title" type="text" value={post.get('title')} onChange={this.linkedValueChanged} />
                                </div>
                            </div>                        
                            <div className="row">
                                <div className="large-12 column">
                                    <label>
                                        <textarea rows="20" className="post-edit-body" name="body" 
                                            value={post.get('body')} onChange={this.linkedValueChanged}/>
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="large-2 column">
                                    <label htmlFor="post_postedon" className="inline">Schedule:</label>
                                </div>
                                <div className="large-4 column">
                                    <input id="post_postedon" type="datetime" />
                                </div>
                                <div className="large-6 column text-right">
                                    <button disabled={this.state.ajaxing} onClick={_.bind(this.buttonClicked, this, 'save')}>Save</button>
                                    <button disabled={this.state.ajaxing} onClick={_.bind(this.buttonClicked, this, 'preview')}>Preview</button>
                                    <button disabled={this.state.ajaxing} onClick={_.bind(this.buttonClicked, this, 'delete')}>Delete</button>
                                </div>
                            </div>
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
                                    <div dangerouslySetInnerHTML={{__html:markdown.toHTML(post.get('body'))}}/>
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
    }
);