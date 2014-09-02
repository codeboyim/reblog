define(['globals', 'react', 'underscore', 'jquery', 'markdown', 'models/post', 'jsx!modal', '_moment', '_datetimepicker'],
    
    function(globals, React, _, $, markdown, PostModel, Modal, moment){

        var exports = Post = React.createClass({

            getInitialState: function(){
                var initialPost = this.props.post || {id:(this.props.id||0)};
                this.model = new PostModel(initialPost);
                return {post:initialPost, ajaxing:false}
            },

            componentDidMount: function (){
                
                
                if(!this.props.post){
                
                    this.model.fetch()
                        .done(_.bind(function (post){
                                            
                            if(this.isMounted()){
                                this.setState({post:_.clone(post.attributes)});
                            }
                            
                            
                        }, this))
                        .always(_.bind(function (){
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
                var post = this.state.post;
                post[e.target.name] = e.target.value;
                this.setState({post:post});
            },

            datetimepickerChangeDateTime: function(dp, $input){
                this.setState({post:_.extend(this.state.post, {'postedOn': dp})});
            },

            postModelChanged: function(event, post){
            
                if(event==='change:postedOn'){
                    $('#post_postedon').val(
                        post.get('postedOn')?post.get('postedOn').dateFormat(globals.SETTINGS.datetimepicker.format):''
                    );
                }
            },

            _onClick: function(type, e){     
                e.preventDefault();

                switch(type){

                    case 'save':
                        this.setState({ajaxing: true}); 
                        this.model.save(this.state.post)
                            .done(_.bind(function(post){
                                    this.setState({post: _.clone(post.attributes)});
                                    if(this.props.onSaved && _.isFunction(this.props.onSaved)){
                                        this.props.onSaved(_.clone(this.state.post));
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
                        Modal.open(<Post post={this.state.post} />);
                        break;

                }
            },
            
            _onDrop: function(type, e){
                e.preventDefault();
                $(e.currentTarget).removeClass('dragover');
                console.info(e);
            },
            
            _onDragOver: function(e){               
                var $t = $(e.currentTarget);
                 e.preventDefault();
                 
                if(!$t.hasClass('dragover')){
                    $t.addClass('dragover');
                }
            },
            
            _onDragLeave: function(e){
              $(e.currentTarget).removeClass('dragover');
            },
            

            renderEditView:function(){
                var post = this.state.post,
                    postedOn='';
                

                postedOn = post.postedOn && _.isDate(post.postedOn)?post.postedOn.dateFormat(globals.SETTINGS.datetimepicker.format):'';

                if(!post){
                    return null;
                }
                else{
                    return (
                        <section>
                            <h3>Edit Post</h3>
                            <div className="row">
                                <div className="large-12 column">
                                    <input name="title" placeholder="title" type="text" value={post.title} onChange={this.linkedValueChanged} />
                                </div>
                            </div>                        
                            <div className="row">
                                <div className="large-12 column">
                                    <label>
                                        <textarea rows="20" className="post-edit-body" name="body" 
                                            value={post.body} onChange={this.linkedValueChanged}/>
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="large-2 column">
                                    <label htmlFor="" className="inline">Panel Image:</label>
                                </div>
                                <div className="large-10 column">
                                    <div className="post-edit-panel-image" onDragOver={this._onDragOver} onDragLeave={this._onDragLeave} onDrop={_.bind(this._onDrop, this, 'panelImage')}>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="large-2 column">
                                    <label htmlFor="" className="inline">Side Image:</label>
                                </div>
                                <div className="large-10 column">
                                    <div className="post-edit-side-image" onDragOver={this._onDragOver} onDragLeave={this._onDragLeave} onDrop={_.bind(this._onDrop, this, 'sideImage')}>
                                    </div>
                                </div>
                            </div>
                            <div className="row">                            
                                <div className="large-2 column">
                                    <label htmlFor="post_postedon" className="inline">Schedule:</label>
                                </div>
                                <div className="large-4 column">
                                    <input id="post_postedon" type="datetime" value={postedOn} readOnly />
                                </div>
                                <div className="large-6 column text-right">
                                    <button disabled={this.state.ajaxing} onClick={_.bind(this._onClick, this, 'save')}>Save</button>
                                    <button disabled={this.state.ajaxing} onClick={_.bind(this._onClick, this, 'preview')}>Preview</button>
                                    <button disabled={this.state.ajaxing} onClick={_.bind(this._onClick, this, 'delete')}>Delete</button>
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
                                    <h1>{post.title}</h1>
                                    <p><time></time></p>
                                </header>
                                <main>
                                    <div dangerouslySetInnerHTML={{__html:markdown.toHTML(post.body)}}/>
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