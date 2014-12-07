var PostModel = require('components/post/model'),
		marked = require('marked'),
		slug = require('slug'),
		router = require('router'),
		path = require('path'),
		hljs = require('highlight.js');

marked.setOptions({
	langPrefix:'hljs ',
	silent: true,
	highlight: code =>{
		return hljs.highlightAuto(code).value;
	}
})

require('./style.scss');
require('ace-builds/src-noconflict/ace');
require('ace-builds/src-noconflict/mode-markdown');

class PostEdit {

	getDefaultProps(){
		return {
			model: new PostModel
		};
	}

	getInitialState(){

		return {
			post: this.props.model.toJSON()
		}
	}

	render(){
		var post = this.state.post;

		return (
			<div className="post edit">
					<div className="postEditTitle">
						<label>Title</label>
						<input type="text" placeholder="Untitled" className="postTitle" name="title" onChange={this._inputChanged} value={post.title} />
					</div>
					<div className="postEdit">
							<label>Content</label>
							<div ref="postEditBody" className="postBody"></div>
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

	componentDidMount(){
		var model = this.props.model,
				editor = this._editor = ace.edit(this.refs.postEditBody.getDOMNode()); 

		this.props.model.on('all', this._modelChanged);
		editor.setFontSize(16);
		editor.setOptions({maxLines: Infinity});
		editor.renderer.setShowGutter(false);
		editor.renderer.setShowPrintMargin(false);
		editor.getSession().setMode('ace/mode/markdown');
		editor.getSession().setUseWrapMode(true);
		
		editor.getSession().on('change', ()=>{
			model.set('body', editor.getValue(), {silent: !!this._editorAutoSaveDisabled});
			if(!this._editorAutoSaveDisabled){
				model.delaySave();
			}
		});

		if(model.id){
			model.fetch();
		}
	}

	componentWillReceiveProps(nextProps){
		var state = this.state,
				attrs;

		if(state.post.objectId !== nextProps.model.id){
			if(nextProps.model.id){
				state.post.objectId = nextProps.model.id;
				nextProps.model.fetch();
			}
			else{
				this.props.model.set(nextProps.model.toJSON());
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

		model.set(post).delaySave();
	}

	_modelChanged(event, model){

		if(this.isMounted()){

			if((event === 'sync' || event === 'change')){

				this.setState({post: model.toJSON()});

				if(this._editor.getValue() !== model.get('body')){
					this._editorAutoSaveDisabled = true;
					this._editor.setValue(model.get('body'), 1);
					this._editorAutoSaveDisabled = false;
				}
			}
			else if(event === 'change:insertText'){
				this._editor.insert(model.get('insertText'));
			}
		}
	}

}

module.exports = React.createClass(PostEdit.prototype);