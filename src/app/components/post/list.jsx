var path = require('path'),
		moment = require('moment');

require('./style.scss');

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
			return (
				<ul className="postList simple">
					{
						list.map((post) => {
							var featureImage = this._findFeatureImage(post);
							return (
								<li key={post.id.substr(0, 5)} className={'postListItem' + ( featureImage?' featured':'' )}>
									<a href={path.join('/p', post.get('seoUrl'))}>
										<i>{moment(post.createdAt).format('LL')}</i>
										<h2>{ post.get('title') }</h2>
										{
											featureImage ?
												<div className="postListItemFeature" style={{backgroundImage: 'url("'+featureImage.get('file').url()+'")'}}></div>
												:null
										}
										<div className="postListItemTitle">
												<p>{post.get('subtitle')}</p>
										</div>
									</a>
								</li>);
						})
					}
				</ul>
			);
		}

		return null;
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