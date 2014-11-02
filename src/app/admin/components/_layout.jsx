/** @jsx React.DOM */

var Sidebar = require('./_sidebar'),    
    Layout = require('shared/_layout');

module.exports = React.createClass({

    render: function(){

        return (
            <Layout>
                <div className="row">
                    <article>
                        <h2 className="hide">Admin</h2>
                        <div className="large-2 column">
                            <Sidebar area={this.props.area} />
                        </div>
                        <div className="large-10 column">
                            {this.props.children}
                        </div>
                    </article>
                </div>
            </Layout>);
                
    }
});
