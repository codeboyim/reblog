var Layout = require( 'shared/_layout' );

function convertImgToBase64(url, callback, contaxt){
    var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL('image/png');
        callback.call(contaxt||this, dataURL.replace(/^data:image\/(png|jpg);base64,/, ''));
        canvas = null; 
    };
    img.src = url;
}

module.exports = React.createClass({

    render: function () {
        return (
            <Layout>
                <button onClick={this._loginClicked}>login</button>
            </Layout>);
    },

    _loginClicked:function (e) {
        var that = this;
        e.preventDefault();
        
        Parse.FacebookUtils.logIn(null, {})
            .done((user)=>{
            
                 if(!user.existed()){

                    FB.api('/me?fields=name, picture.width(200).height(200).type(large)',(res)=>{
                        var acl;
                        
                        acl = new Parse.ACL();
                        acl.setRoleReadAccess('Administrators', true);
                        acl.setPublicReadAccess(false);
                        user.setACL(acl);

                        if (user.get('name') !== res.name) {
                            user.set('name', res.name);
                        }
                        
                        if(!res.picture.data.is_silhouette){
                            convertImgToBase64(res.picture.data.url, (data)=>{
                                user.set('avatar', new Parse.File("profile.png", { base64: data }));
                                user.save();
                                this._login();
                            });
                        }
                        else{
                            user.save();
                            this._login();
                        }

                    });
                }
                else{
                    this._login();
                }

           
            })
            .fail((user, error)=>{
                console.error("User cancelled the Facebook login or did not fully authorize.");
            });

    },
    
    _login(){
         (new Parse.Query(Parse.Role)).equalTo('users', Parse.User.current()).first().done((user)=> {

                if (user) {
                    Parse.User.current().admin = true;
                }

                if(_.isFunction(this.props.onLoggedin)){
                    this.props.onLoggedin();
                }

            });
    }

});