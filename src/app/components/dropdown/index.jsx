require('./style.scss');

class Dropdown {

	getDefaultProps(){
		return{
			className:''
		}; 
	}

	render(){
		return <div className={'dropdown' + (this.props.className && (' ' + this.props.className) || '' )}>
			{this.props.children}</div>;	
	}

}

module.exports = React.createClass(Dropdown.prototype);