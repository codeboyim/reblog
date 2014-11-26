var path = require('path'),
		moment = require('moment'),
		cx = React.addons.classSet;

require('./style.scss');

class PostList{

	getDefaultProps(){
		console.log('default props');
		return {
			mode: 'compact',	//'compact', 'simple'
			activePostId: '',
			list: [] 
		};
	}

	getInitialState(){
		return{
			loading: false
		};
	}

	render(){
		var list = this.props.list,
				cxLoadMore;

		if(this.props.mode === 'compact'){
			return (
				<ul className="postList compact">
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
				cxLoadMore = cx({
					'postListLoadMore': true,
					'loading': this.state.loading
				});

			return (
				<ul ref="postList" className="postList simple">
					{
						list.map((post) => {
							var featureImage = this._findFeatureImage(post);
							return (
								<li key={post.id.substr(0, 5)} className={'postListItem' + ( featureImage?' featured':'' )}>
									<a href={path.join('/p', post.get('seoUrl'))}>
										<i className="postCreatedAt">{moment(post.createdAt).format('LL')}</i>
										{
											featureImage ?
												<div className="postListItemFeature" style={{backgroundImage: 'url("'+featureImage.get('file').url()+'")'}}></div>
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
					<li><i ref="loadMore" className={cxLoadMore}></i></li>
				</ul>
			);
		}

		return null;
	}

	componentDidMount(){
		if(this.props.mode === 'simple'){
			window.addEventListener('scroll', this._onWindowScroll);
			this.props.list.on('all', this._onListChange);
		}
	}

	componentWillUnmount(){
		if(this.props.mode === 'simple'){
			window.removeEventListener('scroll', this._windowOnScroll);
		}
	}

	_onWindowScroll(e){
		var callee = this._onWindowScroll,
				didScroll = callee.didScroll || false,
				list = this.props.list;

		if(!didScroll && !this.state.loading && !list.getAllLoaded()){
			callee.didScroll = true;

			window.setTimeout(()=>{
				var loadMore;

				callee.didScroll = false;

				if(this.isMounted()){
					loadMore = document.body.clientHeight > this.refs.loadMore.getDOMNode().getBoundingClientRect().bottom;

					if(loadMore){
						this.setState({ loading: true });

						this.props.list.fetchHomeList().then(()=>{

							if(this.isMounted()){
								this.setState({ loading: false });
							}

						});
					}
				}
			}, 500);
		}

	}

	_onListChange(model, collection, options){
		if(this.isMounted()){
			this.forceUpdate();
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
				if(regExImage.test(file.get('type'))){
					return file;
				}
			})
			if(images && images.length){
				images.every( img => {
					if(regExFeatureImage.test(img.get('name'))){
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


module.exports = React.createClass(PostList.prototype);