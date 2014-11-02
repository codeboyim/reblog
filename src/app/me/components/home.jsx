var Modal = require('shared/modal');

var Uploader = React.createClass({
    propTypes:{
        initDisableDelete: React.PropTypes.bool,
        onSaved: React.PropTypes.func.isRequired,
        onDeleting: React.PropTypes.func.isRequired
    },
    getInitialState(){
        return {error:false, message:null, disableUpload:true, disableDelete:!!this.props.initDisableDelete};
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
                <div className="text-right">
                    <button className="radius small profileAvatarUpload" disabled={this.state.disableUpload} onClick={this.uploadClicked}>Upload</button>
                    <button className="radius small alert profileAvatarDelete" disabled={this.state.disableDelete} onClick={this.deleteClicked}>remove</button>
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
        
        this.setState({error:false, message:null, disableUpload:false});
        
        if(!imageType.test(file.type)){
            this.setState({error:true, message:'choose an image only', disableUpload:true});
        }
        else if(file.size > maxSize){
            this.setState({error:true, message: 'choose an image smaller than 100kb', disableUpload:true});
        }
        
    },
    
    uploadClicked(e){
        var file;
        e.preventDefault();
        
        if(this.refs.fileInput.getDOMNode().files){
            this.setState({error:false, message:null, disableUpload:true});
            file = this.refs.fileInput.getDOMNode().files[0];
            Parse.User.current().set('avatar', new Parse.File(file.name, file)).save()
                .done((user)=>{
                    if(_.isFunction(this.props.onSaved)){
                        this.props.onSaved(user.get('avatar').url());
                    }
                })
                .fail((err)=>{
                    console.log(err);
                });
            
        }
        else{
            this.setState({error:true, message:'choose an image to upload', disableUpload:true});
        }
    },
    
    deleteClicked(e){
        this.props.onDeleting();
    }
});


var ConfirmBox = React.createClass({
    render(){
        return (
            <div>
                <div>
                    {this.props.message}
                </div>
                <div>
                    <button>OK</button>
                    <button>Cancel</button>
                </div>
            </div>
            
        );
    }
});

module.exports = React.createClass({
    getInitialState(){
        return {editName:false, avatarUrl:require('url?limit=10000!images/medium-avatar.jpg')};
    },
    componentWillMount(){
        var avatar = Parse.User.current().get('avatar');

        if(avatar){
            this.setState({'avatarUrl':avatar.url()});
        }
    },
    render(){
        var avatarUrl = this.state.avatarUrl;
        
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
         this._modal = Modal.open(<Uploader onSaved={this.avatarSaved} onDeleting={this.avatarDeleting} />, 'profileAvatarUploadWrap');
    },
    
    avatarSaved(url){
        this.setState({'avatarUrl':url});
        this._modal.close();
    },
    
    avatarDeleting(){
        Modal.open(<ConfirmBox message="test" />);
    }


});