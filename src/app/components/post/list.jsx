var PostCollection = require('./collection');

class PostList{

	getDefaultProps(){
		return {
			mode:'compact',	
			initialActivePostId:'',
			list: []
		};
	}

	getInitialState(){
		return{
			activePostId: this.props.initialActivePostId,
		};
	}

	render(){
		var list = this.props.list;

		if(this.props.mode === 'compact'){
			return (
				<ul>
					{
						list.map(function(post){
							return <li key={post.id}><a href={ '/a/posts/' + post.id }>{ post.get('title') }</a></li>
						})
					}
				</ul>
			)
		}

		return null;
	}
}


module.exports = React.createClass(PostList.prototype);