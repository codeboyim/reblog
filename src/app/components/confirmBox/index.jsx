require('./style.scss');

import Modal from 'components/modal';

export default class ConfirmBox extends React.Component{

	render(){
		var style = {};
		if(this.props.position){
			style.position = this.props.position;
			style.top = this.props.top; 
			style.bottom = this.props.bottom;
			style.left = this.props.left;
			style.right = this.props.right;
		}

		return (
			<div style={style} className={'confirmBox ' + (this.props.customClass||'')}>
				<header>
					<h2>{this.props.title}</h2>
					<i onClick={this._onCancelClick.bind(this)}></i>
				</header>
				<main>
					{this.props.message}
				</main>
				<footer>
					<button onClick={this._onConfirmClick.bind(this)}>{this.props.confirmButtonText}</button>
				</footer>
			</div>
		);
	}

	componentWillUnmount(){
		if(typeof this.props.onClose === 'function'){
			this.props.onClose.apply(this, [this]);
		}
	}

	_onCancelClick(e){
		e.preventDefault();
		e.stopPropagation();

		if(typeof this.props.onCancel === 'function'){
			this.props.onCancel.apply(this, [this]);
		}

		this._unmount();

	}

	_onConfirmClick(e){
		e.preventDefault();
		e.stopPropagation();


		if(typeof this.props.onConfirm === 'function'){
			this.props.onConfirm.apply(this, [this]);
		}
		this._unmount();

	}

	_unmount(){
			React.unmountComponentAtNode(this.parentNode);
	}
}


ConfirmBox.prototype.statics = {
	open(props){
		let modal = Modal.open(null, onModalClose),
			confirmBox,
			closingModal = false,
			closingConfirm = false,
			{ onRender, onClose, ...props } = props;

		confirmBox = ReactDOM.render(<ConfirmBoxComponent {...props} onClose={onConfirmClose} />, 
			modal.refs.contentContainer);

		if(typeof onRender === 'function'){
			onRender.apply(confirmBox, [confirmBox]);
		}

		function onModalClose(){
			closingModal = true;

			if(!closingConfirm){
				React.unmountComponentAtNode(confirmBox.parentNode);
			}

		}

		function onConfirmClose(){
			closingConfirm = true;

			if(!closingModal){
				Modal.close(modal); 
			}

			if(typeof onClose === 'function'){
				onClose.apply(confirmBox, [confirmBox]);
			}
		}
	}

}

ConfirmBox.defaultProps = {
			title:'',
			message: '',
			confirmButtonText: 'Confirm',
			customClass: '',
			onConfirm: null,
			onCancel: null,
			onClose: null,
			top: null,
			left: null,
			right: null,
			bottom: null,
			position: null
};
