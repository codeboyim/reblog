/** @jsx React.DOM */

var markdown = require('markdown').markdown,
    PostModel = require('models/PostModel'),
    Modal = require('Modal'),
    moment = require('moment'),
    datetimepicker = require('datetimepicker');

module.exports = Post = React.createClass({
            
            acceptImageTypes: {
                'image/png': true,
                'image/jpeg': true,
                'image/gif': true
            },

            getInitialState: function () {
                var initialPost;
                require('./post.css');
                
                initialPost = this.props.post || {
                    id: (this.props.id || 0)
                };
                
                this.model = new PostModel(initialPost);
                
                return {
                    post: initialPost,
                    ajaxing: false
                }
            },

            componentDidMount: function () {

                if (!this.props.post) {
                    this.model.fetch()
                        .done(_.bind(function (post) {

                            if (this.isMounted()) {
                                this.setState({
                                    post: _.clone(post.attributes)
                                });
                            }


                        }, this))
                        .always(_.bind(function () {
                            this.setState({
                                ajaxing: false
                            });
                        }, this));

                          if (this.props.editView) {
                              $('#post_postedon').datetimepicker(
                                  _.extend({
                                      onChangeDateTime: this.datetimepickerChangeDateTime
                                  }, globals.SETTINGS.datetimepicker)
                              );
                          }
                      }

                  },

                  linkedValueChanged: function (e) {
                      var post = this.state.post;
                      post[e.target.name] = e.target.value;
                      this.setState({
                          post: post
                      });
                  },

                  datetimepickerChangeDateTime: function (dp, $input) {
                      this.setState({
                          post: _.extend(this.state.post, {
                              'postedOn': dp
                          })
                      });
                  },

                  onClick: function (type, e) {
                      var post = this.state.post,
                          panelImage,
                          oldPanelImage,
                          sideImage,
                          oldSideImage;

                      e.preventDefault();

                      switch (type) {

                      case 'save':

                          this.setState({
                              ajaxing: true
                          }, _.bind(function () {

                              if (post.panelImage && post.panelImage.file) {
                                  panelImage = new Parse.File(post.panelImage.file.name, post.panelImage.file);

                                  if ((oldPanelImage = this.model.get('panelImage')) && oldPanelImage.destroy) {
                                      oldPanelImage.destroy();
                                  }

                                  post.panelImage = panelImage;
                              } else {
                                  this.model.unset('panelImage');
                              }

                              if (post.sideImage && post.sideImage.file) {
                                  sideImage = new Parse.File(post.sideImage.file.name, post.sideImage.file);

                                  if ((oldSideImage = this.model.get('panelImage')) && oldSideImage.destroy) {
                                      oldSideImage.destroy();
                                  }

                                  post.sideImage = sideImage;
                              } else {
                                  this.model.unset('sideImage');
                              }

                              this.model.save(post)
                                  .done(_.bind(function (post) {
                                      this.setState({
                                          post: _.clone(post.attributes)
                                      });
                                      if (this.props.onSaved && _.isFunction(this.props.onSaved)) {
                                          this.props.onSaved(_.clone(this.state.post));
                                      }

                                  }, this))
                                  .always(_.bind(function () {

                                      if (this.isMounted()) {
                                          this.setState({
                                              ajaxing: false
                                          });
                                      }

                                  }, this));

                          }, this));


                          break;

                      case 'preview':
                          Modal.open(<Post post={this.state.post}/>);
                        break;
                        
                    case 'del-panelImage':
                        delete post.panelImage;
                        this.setState({post:post});
                        break;
                    
                    case 'del-sideImage':
                        delete post.sideImage;
                        this.setState({post:post});
                        break;

                }
            },
                    
            onDrop: function(type, e){
                var reader,
                    file = e.dataTransfer.files[0],
                    post = this.state.post;
                
                e.preventDefault();
                $(e.currentTarget).removeClass('dragover');
                
                if(file && this.acceptImageTypes[file.type]){
                    reader = new FileReader();
                    reader.onload = _.bind(function(_file, _type, evt){
                        post[_type] = {
                            file: _file,
                            dataURL: evt.target.result
                        }
                        this.setState({post: post});
                    }, this, file, type);
                    
                    reader.readAsDataURL(file);
                }
                
            },
            
            onDragOver: function(e){               
                var $t = $(e.currentTarget);
                 e.preventDefault();
                 
                if(!$t.hasClass('dragover')){
                    $t.addClass('dragover');
                }
            },
            
            onDragLeave: function(e){
              $(e.currentTarget).removeClass('dragover');
            },
            renderEditView:function(){
                var post = this.state.post,
                    postedOn='',
                    panelImage = null,
                    sideImage = null;
                
                postedOn = post.postedOn && _.isDate(post.postedOn)?post.postedOn.dateFormat(globals.SETTINGS.datetimepicker.format):'';

                if(!post){
                    return null;
                }
                else{
                    
                    if(post.panelImage){
                    
                        if(_.isFunction(post.panelImage.url)){
                            panelImage = <img src={post.panelImage.url()} />;
                        }
                        else if(post.panelImage.dataURL){
                            panelImage = <img src={post.panelImage.dataURL} />;
                        }
                    }
                    
                   if(post.sideImage){
                    
                        if(_.isFunction(post.sideImage.url)){
                            sideImage = <img src={post.sideImage.url()} />;
                        }
                        else if(post.sideImage.dataURL){
                            sideImage = <img src={post.sideImage.dataURL} />;
                        }
                    }
                
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
                                <div className="clearfix">
                                    <a href="#" className="small right" disabled={this.state.ajaxing} onClick={_.bind(this.onClick, this, 'preview')}>Preview</a>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="large-2 column">
                                    <label htmlFor="" className="inline">Panel Image:</label>
                                </div>
                                <div className="large-10 column">
                                    <div className="post-edit-panel-image" onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={_.bind(this.onDrop, this, 'panelImage')}>
                                       {panelImage}
                                    </div>
                                    <a className="button tiny radius alert" onClick={_.bind(this.onClick, this, 'del-panelImage')}>remove</a>
                                </div>
                            </div>
                            <div className="row">
                                <div className="large-2 column">
                                    <label htmlFor="" className="inline">Post Image:</label>
                                </div>
                                <div className="large-10 column">
                                    <div className="post-edit-side-image" onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={_.bind(this.onDrop, this, 'sideImage')}>
                                        {sideImage}
                                    </div>
                                    <a className="button tiny radius alert" onClick={_.bind(this.onClick, this, 'del-sideImage')}>remove</a>
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
                                    <button disabled={this.state.ajaxing} onClick={_.bind(this.onClick, this, 'save')}>Save</button>
                                    <button disabled={this.state.ajaxing} onClick={_.bind(this.onClick, this, 'delete')}>Delete</button>
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
