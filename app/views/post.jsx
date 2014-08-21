define(['globals', 'react', 'underscore', 'jquery', 'models/post', '_datetimepicker'], function(globals, React, _, $, PostModel){

    var exports = React.createClass({
    
        getInitialState: function(){
            return {post:new PostModel({id:this.props.id}), ajaxing:false}
        },
        
        componentWillMount: function(){
            this.state.post.on('all', this.postModelChanged);
        },
        
        componentDidMount: function (){
            this.setState({ajaxing:true});
            
            this.state.post.fetch().always(_.bind(function (){
                this.setState({ajaxing: false});
            }, this));
            
            $('#post_postedon').datetimepicker(
                _.extend({onChangeDateTime: this.datetimepickerChangeDateTime}, globals.SETTINGS.datetimepicker)
            );
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
            this.forceUpdate();
        },
        
        buttonClicked: function(type, e){     
            e.preventDefault();
            
            switch(type){
            
                case 'save':
                    this.setState({ajaxing: true}); 
                    
                    this.state.post.save().always(_.bind(function(){
                        
                        if(this.isMounted()){
                            this.setState({ajaxing: false});
                        }
                        
                    }, this));
                    
                    break;
                    
                case 'preview':
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
                                <button onClick={_.bind(this.buttonClicked, this, 'save')}>Save</button>
                                <button onClick={_.bind(this.buttonClicked, this, 'preview')}>Preview</button>
                                <button onClick={_.bind(this.buttonClicked, this, 'delete')}>Delete</button>
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