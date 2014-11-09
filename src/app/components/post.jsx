var PostModel = require('./models/post'),
		converter = new (require('showdown').converter)();

		require('ace-builds/src-noconflict/ace');
		require('ace-builds/src-noconflict/mode-markdown');

require('./styles/post.scss');

module.exports = React.createClass({

	render(){
		var postView,
				post = this.state.post;
		switch(this.props.mode){
			case 'view':
				postView = (
					<article className="post postView">
						<header>
							<h1 className="postTitle">{post.get('title')}</h1>
						</header>
						<main className="postBody">
							<div dangerouslySetInnerHTML={{__html:converter.makeHtml(post.get('body'))}} />
						</main>
					</article>
				);
				break;

			case 'edit':
				postView = (
					<fieldset className="post postEdit">
						<div><input type="text" className="postTitle" name="title" onChange={this._inputChanged} value={post.get('title')} /></div>
						<div id="postBody" className="postBody"></div>
					</fieldset>
				);
				break;

				default:
					postView = <div class="post" />;
					break;
		}


		return postView;
	},

	getDefaultProps(){
		return {
			mode:'view', //view, edit, concise
			initialPost: (new PostModel).defaults,
			onChange: function(){}
		}
	},

	getInitialState(){
		return {
			post: new PostModel(this.props.initialPost)
		};
	},

	componentDidMount(){
		var post = this.state.post,
				editor = ace.edit('postBody');

		editor.setValue(post.get('body'));
		editor.renderer.setShowGutter(false);
		editor.renderer.setShowPrintMargin(false);
		editor.getSession().setMode('ace/mode/markdown');
		editor.getSession().on('change', ()=>{
			post.set({body: editor.getValue()});
		});
		post.on('change', this._postChanged);
	},

	componentWillReceiveProps(newProps){
		this.state.post.set(newProps.initialPost, {silent:true})
	},

	_postChanged(){
		this.forceUpdate();
		this.props.onChange(this.state.post.toJSON());
	},

	_inputChanged(e){
		this.state.post.set(e.target.name, e.target.value);	
	}
});