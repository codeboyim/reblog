class ConfirmBox{
	getDefaultProps(){
		return {
			title:'',
			message: '',
			onConfirm: null,
			onCancel: null,
			onClose: null
		}
	}
	render(){
		return (
			<div className="confirmBox">
			<h2></h2>
			<p></p>
			</div>
		);
	}
}