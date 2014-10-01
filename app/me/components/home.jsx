module.exports = React.createClass({
    getInitialState(){
        return {editName:false}
    },
    render(){
        require('./home.css');
        var avatarUrl = require('url?limit=10000!images/medium-avatar.jpg');
        return (
            <div>
                <div className="row">
                    <div className="large-10 large-centered column clearfix small-text-center medium-text-left">
                        <div className="large-4 column">
                            <img src={avatarUrl} className="profileAvatar" />
                        </div>
                        <div className="large-8 column profileTitleWrap">
                            <h2 contentEditable={this.state.editName} className="profileTitle">{Parse.User.current()?Parse.User.current().get('name'):''}</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    
    }
});