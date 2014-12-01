require('./style.scss');

class Modal{

	getDefaultProps(){
		return {
			onClose: null,
			container: null
		}
	}

	render(){
		return (
			<div className="modal">
				<div className="modalOverlay"></div>
				<div className="modalContent" onClick={this._onModalContentClick}>
					{this.props.children}
				</div>
			</div>
		);	
	}

	componentDidMount(){
    window.addEventListener('keydown', this._onWindowKeydown);
	}

	componentWillUnmount(){
    window.removeEventListener('keydown', this._onWindowKeydown);
	}

	_onWindowKeydown(e){
		if((e.which || e.keyCode) === 27){
			ModalComponent.close(this);
		} 
	}

	_onModalContentClick(e){
		ModalComponent.close(this)
	}
}
 
Modal.prototype.statics = {

	open(content, onClose){
		var container = document.createElement('div');

		container.setAttribute('class', 'modalContainer');
		document.body.appendChild(container);
		return React.render(<ModalComponent onClose={onClose||null} container={container}>{content}</ModalComponent>, container);
	},

	close(modal){
		var container = modal.props.container;

		if(typeof modal.props.onClose === 'function' && modal.props.onClose(modal) === false){
			return;
		}

		React.unmountComponentAtNode(container);
		document.body.removeChild(container);
	}

}

var ModalComponent = React.createClass(Modal.prototype);

module.exports = ModalComponent;