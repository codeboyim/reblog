var PostModel = require('components/post/model'),
		marked = require('marked'),
		slug = require('slug');

require('./style.scss');
require('ace-builds/src-noconflict/ace');
require('ace-builds/src-noconflict/mode-markdown');
class PostEdit {

	render(){
		var post = this.state.post;

		return (
			<div className="post edit">
					<div>
						<label>Title</label>
						<input type="text" placeholder="Untitled" className="postTitle" name="title" onChange={this._inputChanged} value={post.title} />
					</div>
					<div className="postEdit">
							<label>Post Content</label>
							<div ref="postBody" className="postBody"></div>
					</div>
					<div className="postPreview">
						<label>Preview</label>
						<div className="postBody">
							<div dangerouslySetInnerHTML={{__html:marked(post.body)}} />
						</div>
					</div>
			</div>
		);
	}

	getDefaultProps(){
		return {
			model: new PostModel
		};
	}

	getInitialState(){

		return {
			post: this.props.model.toJSON(),
		}
	}

	componentDidMount(){
		var model = this.props.model,
				editor = this._editor = ace.edit(this.refs.postBody.getDOMNode()); 

		this.props.model.on('all', this._modelChanged);
		editor.setFontSize(16);
		editor.renderer.setShowGutter(false);
		editor.renderer.setShowPrintMargin(false);
		editor.getSession().setMode('ace/mode/markdown');
		
		editor.getSession().on('change', ()=>{
			model.set('body', editor.getValue());
			if(!this._editorAutoSaveDisabled){
				this._autoSave();
			}
			this._editorAutoSaveDisabled = false;
		});

		if(model.id){
			model.fetch();
		}
	}

	componentWillReceiveProps(nextProps){
		var state = this.state;

		if(this.state.post.objectId !== nextProps.model.id){
			if(nextProps.model.id){
				nextProps.model.fetch();
			}
			else{
				nextProps.model.reset();
			}
		}

	}

	_inputChanged(e){
		var post = {},
				target = e.target,
				model = this.props.model;

		post[target.name] = target.value;

		if(target.name === 'title'){
			post['seoUrl'] = slug(target.value.trim());
		}

		model.set(post);
		this._autoSave();
	}

	_autoSave(){

		if(this._autoSave.timeoutId){
			window.clearTimeout(this._autoSave.timeoutId);
		}

		this._autoSave.timeoutId = window.setTimeout(() => {
			this.props.model.save();
		}, 2000);

	}

	_modelChanged(event, model){

		if((event === 'sync' || event === 'change') && this.isMounted()){
			this.setState({ post: model.toJSON() });

			if(this._editor.getValue() !== model.get('body')){
					this._editorAutoSaveDisabled = true;
				this._editor.setValue(model.get('body'));
			}
		}

	}

}

module.exports = React.createClass(PostEdit.prototype);