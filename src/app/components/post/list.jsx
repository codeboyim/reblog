import path from 'path';
import moment from 'moment';
import PostCollection from './collection';
import cx from 'classnames';

require('./style.scss');

class PostList extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			loading: false,
			posts: new PostCollection
		};
	}

	render(){
		var posts = this.state.posts,
			type = this.props.type,
			cxLoadMore;

		if(type === 'drafts' || type === 'published'){
			return (
				<ul className="postList compact">
					{
						posts.map((post) => {
							return (
								<li key={post.get('objectId').substr(0, 5)} className={this.props.activePostId===post.get('objectId')?'active':''}>
									<a href={path.join('/a/p', post.get('objectId'))}>{ post.get('title')?post.get('title'):'Untitled' }</a>
								</li>);
						})
					}
				</ul>
			)
		} else {
				cxLoadMore = cx({
					'postListLoadMore': true,
					'loading': this.state.loading
				});

			return (
				<ul ref="postList" className="postList simple">
					{
						posts.map((post) => {
							var featureImage = this._findFeatureImage(post);
							return (
								<li key={post.get('objectId').substr(0, 5)} className={'postListItem' + ( featureImage?' featured':'' )}>
									<a href={path.join('/p', post.get('seoUrl'))}>
										<i className="postCreatedAt">{moment(post.createdAt).format('LL')}</i>
										{
											featureImage ?
												<div className="postListItemFeature" style={{backgroundImage: 'url("'+featureImage.file.url+'")'}}></div>
												:null
										}
										<div className="postListItemTitle">
											<h2>{ post.get('title') }</h2>
											<p>{ post.get('subtitle') }</p>
										</div>
									</a>
								</li>);
						})
					}
					<li>
						<div ref="loadMore" className={cxLoadMore}>
							<span></span><span></span><span></span>
						</div>
					</li>
				</ul>
			);
		}

		return null;
	}

	componentDidMount(){

		if(this.props.type === 'home'){
			window.addEventListener('scroll', this._onWindowScroll.bind(this));
		}

		this._loadPosts();
	}

	componentWillReceiveProps(nextProps){
		if(this.props.type !== 'home'){
			this._loadPosts();
		}
	}

	componentWillUnmount(){

		if(this.props.type === 'home'){
			window.removeEventListener('scroll', this._windowOnScroll);
		}
	}

	_onWindowScroll(e){
		var callee = this._onWindowScroll,
				didScroll = callee.didScroll || false,
				posts = this.state.posts;

		if(!didScroll && !this.state.loading && !posts.getAllLoaded()){
			callee.didScroll = true;

			window.setTimeout(()=>{
				callee.didScroll = false;
				this._loadHomeList();
			}, 500);
		}

	}

	_loadPosts(){
		var posts = this.state.posts;

		switch(this.props.type){
			case 'home':
				this._loadHomeList();
				break;
			case 'drafts':
				posts.fetchDrafts();
				break;
			case 'published':
				posts.fetchPublished();
				break;
			default: break;
		}	
	}

	_loadHomeList(){
		var loadMore,
				posts = this.state.posts;

			loadMore = document.body.clientHeight > this.refs.loadMore.getDOMNode().getBoundingClientRect().bottom;

			if(loadMore){
				this.setState({ loading: true });

				posts.fetchHomeList().then(()=>{

					// if(this.isMounted()){
						this.setState({ loading: false });
					// }

				});
			}

	}

	_onListChange(model, collection, options){
			this.forceUpdate();

			if(this.props.type === 'home'){
				this._loadHomeList();
			}
	}

	_findFeatureImage(post){
		var files = post.get('files'),
				images,
				regExImage = /^image/i,
				regExFeatureImage = /^feature(?:\.\w+)/i,
				featureImage;

		if(files && Array.isArray(files)){
			images = files.map( file => {
				if(regExImage.test(file.type)){
					return file;
				}
			})
			if(images && images.length){
				images.every( img => {
					if(regExFeatureImage.test(img.name)){
						featureImage = img;
						return false;
					}
					return true;
				});

				if(!featureImage){
					featureImage = images[0];
				}
			}
		}

		return featureImage;
	}

}

PostList.defaultProps = { 
	type: '',	//'drafts', 'published', 'home' 
	activePostId: ''
};
export default PostList;