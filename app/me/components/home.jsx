var Modal = require('shared/modal');

var Uploader = React.createClass({
    getInitialState(){
        return {error:false, message:null};
    },
    render(){
        var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
        return (
            <div>
                <div>
                    <input ref="fileInput" type="File" accept="image/*" onChange={this.uploadChanged}/>
                </div>
                <ReactCSSTransitionGroup transitionName="fadeInOut">
                    {this.state.error && this.state.message?
                    <div className="alert-box alert radius">
                        {this.state.message}
                        <a href="#" className="close" onClick={(e)=>{e.preventDefault();this.setState({message:null})}}>&times;</a>
                    </div>
                    :null}
                </ReactCSSTransitionGroup>
                <div>
                    <button className="right radius small profileAvatarUpload" disabled={this.error} onClick={this.uploadClicked}>Upload</button>
                </div>
            </div>
        );
    },
    
    uploadChanged(e){

        var file = e.target.files && e.target.files[0] || null,
            imageType = /image.*/,
            maxSize = 100000/*100kb*/;
        
        if(!file){
            return;
        }
        
        this.setState({error:false, message:null});
        
        if(!imageType.test(file.type)){
            this.setState({error:true, message:'choose an image only'});
        }
        else if(file.size > maxSize){
            this.setState({error:true, message: 'choose an image smaller than 100kb'});
        }
        
    },
    
    uploadClicked(e){
        e.preventDefault();
        
        if(!this.refs.fileInput.file){
            this.setState({error:true, message:'choose an image to upload'});
        }
    }
});

module.exports = React.createClass({
    getInitialState(){
        return {editName:false}
    },
    render(){
        var avatarUrl = require('url?limit=10000!images/medium-avatar.jpg');
        return (
            <div>
                <div className="row">
                    <div className="large-10 large-centered column clearfix small-text-center medium-text-left">
                        <div className="large-4 column profileAvatarWrap">
                            <img src={avatarUrl} className="profileAvatar" />
                            <button className="tiny secondary radius profileChangeAvatar" onClick={this.changeAvatarClicked}>change</button>
                        </div>
                        <div className="large-8 column profileTitleWrap">
                            <h2 contentEditable={this.state.editName} className="profileTitle">{Parse.User.current()?Parse.User.current().get('name'):''}</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    
    },
    
    changeAvatarClicked(e){
         this._modal = Modal.open(<Uploader />, 'profileAvatarUploadWrap');
    },
    


});