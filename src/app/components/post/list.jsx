var path = require('path');

class PostList{

	getDefaultProps(){
		return {
			mode:'compact',	//'compact', 'simple'
			activePostId:'',
			list: []
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
				<ul className="postlist">
					{
						list.map((post) => {
							return (
								<li key={post.id.substr(0, 5)} className={this.props.activePostId===post.id?'active':''}>
									<a href={path.join('/a/p', post.id)}>{ post.get('title')?post.get('title'):'Untitled' }</a>
								</li>);
						})
					}
				</ul>
			)
		} else {
			return (
				<ul className="postList">
					{
						list.map((post) => {
							return (
								<li key={post.id.substr(0, 5)}>
									<a href={path.join('/p', post.get('seoUrl'))}>{ post.get('title')?post.get('title'):'Untitled' }</a>
								</li>);
						})
					}
				</ul>
			);
		}

		return null;
	}
}


module.exports = React.createClass(PostList.prototype);