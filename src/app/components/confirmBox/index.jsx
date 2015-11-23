var Modal = require('components/modal');
require('./style.scss');

class ConfirmBox{
	getDefaultProps(){
		return {
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
		}
	}

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
					<i onClick={this._onCancelClick}></i>
				</header>
				<main>
					{this.props.message}
				</main>
				<footer>
					<button onClick={this._onConfirmClick}>{this.props.confirmButtonText}</button>
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
			React.unmountComponentAtNode(this.getDOMNode().parentNode);
	}
}


ConfirmBox.prototype.statics = {
	open(props){
		let modal = Modal.open(null, onModalClose),
			confirmBox,
			closingModal = false,
			closingConfirm = false,
			{ onRender, onClose, ...props } = props;

		confirmBox = React.render(<ConfirmBoxComponent {...props} onClose={onConfirmClose} />, modal.refs['contentContainer'].getDOMNode());

		if(typeof onRender === 'function'){
			onRender.apply(confirmBox, [confirmBox]);
		}

		function onModalClose(){
			closingModal = true;

			if(!closingConfirm){
				React.unmountComponentAtNode(confirmBox.getDOMNode().parentNode);
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

var ConfirmBoxComponent = React.createClass(ConfirmBox.prototype);

module.exports = ConfirmBoxComponent;