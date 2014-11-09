var Post = require('components/post');

module.exports = React.createClass({
	render(){
		return (
			<div className="adminPost">
			<div className="adminPostEdit"><Post onChange={this._postEdited} mode="edit" initialPost={this.state.post}/></div>
			<div className="adminPostPreview"><Post mode="view" initialPost={this.state.post} /></div>
			</div>
		);
	},

	getInitialState(){
		return {
			post:{}
		}
	},

	_postEdited:function(newPost){
		this.setState({post: newPost});
	}
});