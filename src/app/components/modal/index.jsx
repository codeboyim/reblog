require('./style.scss');

class Modal extends React.Component{

	render(){
		return (
			<div className={'modal ' + (this.props.customClass||'')}>
				<div className="modalOverlay"></div>
				<div ref="contentContainer" className="modalContent" onClick={this._onModalContentClick}>
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
		e.stopPropagation();

		if(e.currentTarget === e.target){
			ModalComponent.close(this)
		}
	}

	static open(content, customClass, onClose, onRendered){
		var container = document.createElement('div');

		if(typeof customClass === 'function'){
			onRendered = onClose;
			onClose = customClass;
		}
		container.setAttribute('class', 'modalContainer');
		document.body.appendChild(container);
		return React.render(<ModalComponent onClose={onClose||null} customClass={customClass} container={container}>{content}</ModalComponent>, container, onRendered);
	}

	static close(modal){
		var container = modal.props.container;

		if(typeof modal.props.onClose === 'function' && modal.props.onClose(modal) === false){
			return;
		}

		React.unmountComponentAtNode(container);
		document.body.removeChild(container);
	}
}

Modal.defaultProps = {
			onClose: null,
			container: null,
			customClass: null 
};

export default Modal;