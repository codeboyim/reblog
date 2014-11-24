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
					<i className="postCreatedAt">{moment(post.get('createdAt')).format('LL')}</i>
					<h2>{post.get('title')}</h2>
				</header>
				<main className="postBody">
					<div dangerouslySetInnerHTML={{__html: marked(post.get('body')) }}></div>
				</main>
			</article>
		);
	}
}

module.exports = React.createClass(PostView.prototype);