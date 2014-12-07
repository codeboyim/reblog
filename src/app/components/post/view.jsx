var moment = require('moment'),
		marked = require('marked');

require('./style.scss');

class PostView{
	getDefaultProps(){
		return {
			post:null
		}
	}

	render(){
		var post = this.props.post;

		return(
			<article className="post view">
				<header className="postTitle">
					<i className="postCreatedAt">{moment(post.createdAt).format('LL')}</i>
					<h1>{post.get('title')}</h1>
				</header>
				<main className="postBody">
					<div dangerouslySetInnerHTML={{__html: marked(post.get('body')) }}></div>
				</main>
			</article>
		);
	}
}

module.exports = React.createClass(PostView.prototype);