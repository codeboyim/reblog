var path = require('path');

class PostList{

	getDefaultProps(){
		return {
			mode:'compact',	
			activePostId:'',
			list: [],
			path: '/a/drafts/'
		};
	}

	getInitialState(){
		return{
		};
	}

	render(){
		var list = this.props.list;

		if(this.props.mode === 'compact'){
			return (
				<ul>
					{
						list.map((post) => {
							return <li key={post.id} className={this.props.activePostId===post.id?'active':''}><a href={path.join(this.props.path, post.id)}>{ post.get('title') }</a></li>
						})
					}
				</ul>
			)
		}

		return null;
	}
}


module.exports = React.createClass(PostList.prototype);