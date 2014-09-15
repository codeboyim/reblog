/** @jsx React.DOM */

module.exports = React.createClass({
    mixins: [require('../../mixins/ListenToAuthStatusChanged')],

    render: function(){
        return (
            <aside>
                <h3 className="hide">Admin Menu</h3>
                <ul className="side-nav" role="menu">
                    <li className={this.isActive('home')?'active':''}><a href="#admin">Admin Home</a></li>
                    {this.state.admin?
                        <li className={this.isActive('users')?'active':''}>
                            <a href="#admin/users">Users</a>
                        </li>:null}
                    {this.state.admin?
                        <li className={this.isActive('posts')?'active':''}>
                            <a href="#admin/posts">Posts</a>
                        </li>:null}
                    <li className={this.isActive('prefs')?'active':''}><a href="#admin/prefs">Preferences</a></li>
                </ul>                                
            </aside>);
    },

    isActive:function(name){
        return  (this.props.area||'home') === name;
    }
});