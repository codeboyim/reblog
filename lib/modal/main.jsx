define(['underscore', 'react', 'jquery'], function(_, React, $){
        
    var exports = Modal = React.createClass({
        
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
            open: function(content){
                this._bg = this._bg || $('.reveal-modal-bg');
                this._modals = this._modals || [];
                
                if(!this._bg[0]){
                    this._bg = $('<div class="reveal-modal-bg" style="display:block"></div>').appendTo(document.body);
                    this._bg.on('click', _.bind(this.close, this));
                }
                else{
                    this._bg.show();
                }
                
                this._modals.push(React.renderComponent(<Modal>{content}</Modal>, 
                    $('<div class="reveal-modal" style="visibility: visible; display: block; opacity:1"></div>').appendTo(document.body)[0]));
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
                }
            }
        }
    
    });
    
    
    return exports;
});