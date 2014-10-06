/** @jsx React.DOM */
    
module.exports = Modal = React.createClass({

    componentWillMount(){

    },

    componentDidMount(){
        $(document).on('keydown', this._docKeyDown);
    },
    
    componentDidUnmount(){
        $(document).off('keydown', this._docKeyDown);
    },

    render(){
       
        return (
            <div>
                <div className="reveal-modal-bg" style={{display:'block'}} onClick={this.close} ></div>
                {_.map(this.props.contents, (content, idx)=>{
                return (<div key={'modal-'+idx} className="reveal-modal radius" style={{visibility: 'visible', display: 'block', opacity:1}}>
                    {content}
                </div>);
                })}
            </div>
        );
    },
    
    close(){
        Modal.close();
    },
    
    _docKeyDown(e){
        if(e.keyCode === 27){
            this.close();
        }
    },

    statics: {
    
        open: function(content, className){
            var contents;
            
            if(!this._modal){
                this._modal = React.renderComponent(
                    <Modal className={className} contents={[content]}></Modal>, 
                    document.getElementById('rootModalWrap'));
            }
            else{
                contents = this._modal.props.contents;
                contents.push(content);
                this._modal.setProps({ contents: contents });
            }
            
        },

        close: function(i){
            var contents = this._modal.props.contents;
            
            if(i === null || typeof i === 'undefined'){
                i=contents.length-1;
            }
            
            contents.splice(i, 1);
            
            if(contents.length){
                this._modal.setProps({contents:contents});
            }
            else{
                React.unmountComponentAtNode(document.getElementById('rootModalWrap'));
                this._modal = null;
            }
                
        }
    }

});
