var PostModel = require('components/models/post'),
		converter = new (require('showdown').converter)();

		require('ace-builds/src-noconflict/ace');
		require('ace-builds/src-noconflict/mode-markdown');

module.exports = React.createClass({
	render(){
		var post = this.state.post;

		return (
			<div className="adminPost">
					<div>
						<label className="adminPostLabel">Title</label>
						<input type="text" placeholder="Untitled" className="adminPostTitle" name="title" onChange={this._inputChanged} value={post.get('title')} />
					</div>
					<div className="adminPostEdit">
							<label className="adminPostLabel">Post Content</label>
							<div ref="postBody" className="adminPostBody"></div>
					</div>
					<div className="adminPostView">
						<label className="adminPostLabel">Preview</label>
						<div className="adminPostBody">
							<div dangerouslySetInnerHTML={{__html:converter.makeHtml(post.get('body'))}} />
						</div>
					</div>
			</div>
		);
	},

	getInitialState(){
		return {
			post: new PostModel({id: this.props.id})
		}
	},

	getDefaultProps(){
		return {
			id: null
		};
	},

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
		});
	},

	_postChanged(){
		this.forceUpdate();
	},

	_inputChanged(e){
		this.state.post.set(e.target.name, e.target.value);	
	}
});