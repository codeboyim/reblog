/** @jsx React.DOM */

require('./modal.css');

module.exports = Modal = React.createClass({

    getInitialState(){
        return { showModal:false };
    },

    componentDidMount(){
        $(document).on('keydown', this._docKeyDown);
        window.setTimeout(()=>{
         this.setState({ showModal: true});}, 1);
    },
    
    componentWillUnmount(){
        $(document).off('keydown', this._docKeyDown);
    },
    
    componentWillReceiveProps(nextProps){
        
        if(!_.isUndefined(nextProps.showModal)){
            this.setState({ showModal: nextProps.showModal });
        }
    },
    
    componentDidUpdate(){
       
    },

    render(){
        var CSSTransitionGroup = React.addons.CSSTransitionGroup;
        return (
            <div style={{display:!this.props.hidden?'block':'none'}}>
                <div className="reveal-modal-bg" style={{display:'block', visibility:'visible', opacity:this.state.showModal?1:0}} onClick={this.close}></div>
                <CSSTransitionGroup transitionName="scaleInOut">
                {
                    this.state.showModal?
                            <div className={'reveal-modal radius'+(this.props.className?' '+this.props.className:'')} 
                                style={{visibility: 'visible', display: 'block', opacity: 1}}>
                                {this.props.children}
                            </div>:null
                }
                </CSSTransitionGroup>
            </div>
        );
    },
    
    close(){
        Modal.close(this);
    },
    
    _docKeyDown(e){
        if(e.keyCode === 27){
            this.close();
        }
    },

    statics: {
    
        open: function(content, className){
            var container = document.createElement('DIV'),
                modal, len;
                
            this._modals = this._modals || [];
            document.getElementById('rootModalWrap').appendChild(container);
            
            modal = React.renderComponent(<Modal className={className}>{content}</Modal>, container);
            
            this._modals.push(modal);
            
            if((len=this._modals.length)>1){
                window.setTimeout(()=>{
                this._modals[len-2].setProps({hidden:true});
                }, 100);
            }
            
            return modal;
        },

        close: function(modal){
            var container;
            
            if(!modal){
                modal = this._modals.pop();
            }
            else{
                this._modals.splice(this._modals.indexOf(modal), 1);
            }
            
            modal.setProps({showModal:false});
            
            window.setTimeout(()=>{
                if((len=this._modals.length)>0){
                    this._modals[len-1].setProps({ hidden: false});
                }
            }, 150);
            
            window.setTimeout(()=>{
                container = modal.getDOMNode().parentNode;
            
                React.unmountComponentAtNode(container);
                container.parentNode.removeChild(container);
            }, 300);
          
        }
    }

});
