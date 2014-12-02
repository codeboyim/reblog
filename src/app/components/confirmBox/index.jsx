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
			onClose: null
		}
	}

	render(){
		return (
			<div className={'confirmBox ' + (this.props.customClass||'')}>
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
			this.props.onClose.call(this);
		}
	}

	_onCancelClick(e){
		e.stopPropagation();
		if(typeof this.props.onCancel === 'function'){
			this.props.onCancel.call(this);
		}
	}

	_onConfirmClick(e){
		e.preventDefault();
		e.stopPropagation();
		if(typeof this.props.onConfirm === 'function'){
			this.props.onConfirm.call(this);
		}
	}
}

module.exports = React.createClass(ConfirmBox.prototype);