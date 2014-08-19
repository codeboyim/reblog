define(['react', 'parse', 'jquery', 'globals', 'mixins/ListenToAuthStatusChanged',
    'jsx!./admin.users', 'jsx!./admin.posts', 'jsx!./admin.prefs', 'jsx!views/post'], 

    function(React, Parse, $, globals, ListenToAuthStatusChanged, Users, Posts, Prefs, Post){


        var exports = React.createClass({

            mixins: [ListenToAuthStatusChanged],
            
            getInitialState:function(){
                return {admin:!!Parse.User.current().admin};
            },
            
            render: function(){
                return (<div className="row">
                            <article>
                                <h2 className="hide">Admin</h2>
                                <div className="large-3 column">
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
                                    </aside>
                                </div>
                                <div className="large-9 column">
                                    {this.renderSubView()}
                                </div>
                            </article>
                        </div>);
            },
            
            renderSubView: function(){
                var id;

                switch(this.props.area){
                    case 'users':
                        return this.state.admin?<Users />:null;
                    case 'posts':
                        if(!this.state.admin){
                            return null;
                        }
                        else{
                            return (id=(this.props.options && this.props.options.id))?
                                <Post id={id} editView={true}/>:<Posts />
                        }
                    case 'prefs':
                        return <Prefs />;
                    default:
                        return null;                
                }
            },
            
            isActive:function(name){
                return  (this.props.area||'home')===name;
            }

        });

        return exports;

    }
);