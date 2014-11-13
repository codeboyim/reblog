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
						<input type="text" placeholder="Untitled" className="adminPostTitle" name="title" onChange={this._inputChanged} value={post.title} />
					</div>
					<div className="adminPostEdit">
							<label>Post Content</label>
							<div ref="postBody" className="adminPostBody"></div>
					</div>
					<div className="adminPostView">
						<label>Preview</label>
						<div className="adminPostBody">
							<div dangerouslySetInnerHTML={{__html:marked(post.body)}} />
						</div>
					</div>
			</div>
		);
	}

	getDefaultProps(){
		return {
			model: new PostModel,
			onChange: ()=>{},
			onSaving: ()=>{},
			onSaved: ()=>{}
		};
	}

	getInitialState(){
		return {
			post: this.props.model.toJSON(),
			saving: false
		}
	}

	componentDidMount(){
		var post = this.state.post,
				editor = ace.edit(this.refs.postBody.getDOMNode());

		this.props.model.on('change', this._modelChanged);
		editor.setValue(post.body);
		editor.setFontSize(16);
		editor.renderer.setShowGutter(false);
		editor.renderer.setShowPrintMargin(false);
		editor.getSession().setMode('ace/mode/markdown');
		
		editor.getSession().on('change', ()=>{
			post.body = editor.getValue();
			this.setState({ post: post });
		});
	}

	componentWillUpdate(nextProps, nextState){
	}

	_inputChanged(e){
		var post = this.state.post,
				target = e.target;

		post[target.name] = target.value;
		this.props.model.set(post);
	}

	_modelChanged(model){
		this.setState({ post: model.toJSON() });
	}
}

module.exports = React.createClass(PostEdit.prototype);