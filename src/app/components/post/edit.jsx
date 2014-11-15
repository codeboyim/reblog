var PostModel = require('components/post/model'),
		marked = require('marked'),
		slug = require('slug');

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
			model: new PostModel
		};
	}

	getInitialState(){
		return {
			post: this.props.model.toJSON(),
			postId: this.props.model.id
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
			model.set('body', editor.getValue(), {silent: ture});
		});

		if(model.id){
			model.fetch();
		}
	}

	componentWillReceiveProps(nextProps){
		var state = this.state;

		if(this.state.postId !== nextProps.model.id){
			state.postId = nextProps.model.id;

			if(nextProps.model.id){
				nextProps.model.fetch();
			}

			this.setState(state);
		}
	}

	componentWillUpdate(nextProps, nextState){
	}

	_inputChanged(e){
		var post = this.state.post,
				target = e.target,
				model = this.props.model;

		post[target.name] = target.value;

		if(target.name === 'title'){
			post['seoUrl'] = slug(target.value.trim());
		}

		model.set(post);

		if(this._autoSaveTimeoutId){
			window.clearTimeout(this._autoSaveTimeoutId);
		}

		this._autoSaveTimeoutId = window.setTimeout(() => {
			model.save();
		}, 2000);
	}

	_modelChanged(event, model){
		if((event === 'sync' || event === 'change') && this.isMounted()){
			this.setState({ post: model.toJSON() });
			this._editor.setValue(model.get('body'));
		}

	}

}

module.exports = React.createClass(PostEdit.prototype);