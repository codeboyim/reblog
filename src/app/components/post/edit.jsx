var PostModel = require('components/post/model'),
		marked = require('marked');

require('ace-builds/src-noconflict/ace');
require('ace-builds/src-noconflict/mode-markdown');

class PostEdit {

	render(){
		var post = this.state.post;

		return (
			<div className="adminPost">
					<div>
						<label>Title</label>
						<input type="text" placeholder="Untitled" className="adminPostTitle" name="title" onChange={this._inputChanged} value={post.get('title')} />
					</div>
					<div className="adminPostEdit">
							<label>Post Content</label>
							<div ref="postBody" className="adminPostBody"></div>
					</div>
					<div className="adminPostView">
						<label>Preview</label>
						<div className="adminPostBody">
							<div dangerouslySetInnerHTML={{__html:marked(post.get('body'))}} />
						</div>
					</div>
			</div>
		);
	}

	getInitialState(){
		return {
			post: new PostModel({id: this.props.id}),
			saving: false
		}
	}

	getDefaultProps(){
		return {
			id: null,
			onPostChanged: ()=>{},
			onSaving: ()=>{},
			onSaved: ()=>{}
		};
	}

	componentDidMount(){
		var post = this.state.post,
				editor = ace.edit(this.refs.postBody.getDOMNode());

		post.on('change', this._postChanged);

		editor.setValue(post.get('body'));
		editor.setFontSize(16);
		editor.renderer.setShowGutter(false);
		editor.renderer.setShowPrintMargin(false);
		editor.getSession().setMode('ace/mode/markdown');
		editor.getSession().on('change', ()=>{
			post.set({body: editor.getValue()});
			this._autoSave();
		});
	}

	_postChanged(post){
		this.forceUpdate();
		this.props.onPostChanged(post.toJSON());
	}

	_inputChanged(e){
		this.state.post.set(e.target.name, e.target.value);	
		this._autoSave();
	}

	_autoSave(){

		if(this._autoSave.timeoutId){
			window.clearTimeout(this._autoSave.timeoutId);
		}

		this._autoSave.timeoutId = window.setTimeout(() => {
			this.props.onSaving();
			console.log('saving');
			this.state.post.save().then(() => this.props.onSaved());
		}, 5000);

	}
}

module.exports = React.createClass(PostEdit.prototype);