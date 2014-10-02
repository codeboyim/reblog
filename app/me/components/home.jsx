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
                        <div className="large-4 column">
                            <img src={avatarUrl} className="profileAvatar" />
                            <button className="tiny secondary profileChangeAvatar">change</button>
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