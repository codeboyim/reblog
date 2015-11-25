import moment from 'moment';
import marked from 'marked';
import hljs from 'highlight.js';

require('./style.scss');

marked.setOptions({
	langPrefix:'hljs ',
	silent: true,
	highlight: code =>{
		return hljs.highlightAuto(code).value;
	}
})

class PostView extends React.Component{

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

PostView.defaultProps = {post: null};

export default PostView;