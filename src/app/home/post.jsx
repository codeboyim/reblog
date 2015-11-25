import Layout from 'components/layout';
import PostModel from 'components/post/model';
import Post from 'components/post/view';
import router from 'router';
var post = new PostModel;

post.on('all', modelChanged);

function render(){
		ReactDOM.render(<Layout postId={post.get('objectId')}><Post post={post} /></Layout>, document.body);
}

function modelChanged(event, model){
	if(event === 'sync'){
		render();
	}
	else if(event === 'notFound'){
		router.setRoute('/404');
	}
}

export default seoUrl => {
	post.set({seoUrl: seoUrl}, {silent: true}).fetchBySeoUrl();
};