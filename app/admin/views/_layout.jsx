/** @jsx React.DOM */

var Sidebar = require('./_sidebar'),
    React = require('react');

module.exports = React.createClass({

    render: function(){

        return (
            <div className="row">
                <article>
                    <h2 className="hide">Admin</h2>
                    <div className="large-3 column">
                        <Sidebar area={this.props.area} />
                    </div>
                    <div className="large-9 column">
                        {this.props.children}
                    </div>
                </article>
            </div>);
    }
});
