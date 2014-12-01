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
				<div className="modalContent">
					{this.props.children}
				</div>
			</div>
		);	
	}

	componentDidMount(){
    window.addEventListener('keydown', this._onWindowKeydown);
	}

	_onWindowKeydown(e){

	}

}
 
Modal.prototype.statics = {

	open(content, onClose){
		var container = document.createElement('div');

		container.setAttribute('class', 'modalContainer');
		document.body.appendChild(container);
		React.render(<ModalComponent onClose={onClose||null} container={container}>{content}</ModalComponent>, container);
	},

	close(modal){
		var container = modal.props.container;

		if(typeof modal.props.onClose === 'function' && !model.props.onClose()){
			return;
		}

		React.unmountComponentAtNode(container);
		document.body.removeChild(container);
	}

}

var ModalComponent = React.createClass(Modal.prototype);

module.exports = ModalComponent;