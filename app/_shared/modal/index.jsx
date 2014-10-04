/** @jsx React.DOM */

var _ = require('underscore'),
    React = require('react'), 
    $ = require('jquery');
        
module.exports = Modal = React.createClass({

    componentWillMount: function(){

    },

    componentDidMount: function(){

    },

    render: function(){
        return (
            <div>
                {this.props.children}
            </div>
        );
    },

    statics: {

        open: function(content, className){
            var container, modal;
            this._bg = this._bg || $('.reveal-modal-bg');
            this._modals = this._modals || [];

            if(!this._bg[0]){
                this._bg = $('<div class="reveal-modal-bg" style="display:block"></div>').appendTo(document.body);
                this._bg.on('click', _.bind(this.close, this));
                $(document).on('keydown', this._docKeyDown);
            }
            else{
                this._bg.show();
            }
            
            container = $('<div class="reveal-modal radius" style="visibility: visible; display: block; opacity:1"></div>').appendTo(document.body);
            
            if(className){
                container.addClass(className);
            }
            
            modal = React.renderComponent(<Modal>{content}</Modal>, container[0]);
            modal.container = container[0];
            this._modals.push(modal);
            return modal;
        },

        close: function(){
            var container;

            if(this._modals.length>0){
                container = this._modals.pop().getDOMNode().parentNode;
                React.unmountComponentAtNode(container);

                if(container.remove){
                    container.remove(); 
                }
                else{
                    container.parentNode.removeChild(container);
                }

            }

            if(this._modals.length === 0){
                this._bg.remove();
                this._bg = null;
                $(document).off('keydown', this._docKeyDown);
            }
        },

        _docKeyDown:function(e){

            if(e.keyCode === 27){
                Modal.close();
            }
        }
    }

});
