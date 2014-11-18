var router = require('router');

require('./style.scss');

class Login{

	getDefaultProps(){
		return {
			returnUrl: ''
		}
	}

	getInitialState(){
		return {
			'name':'',
			'password': '',
			'flashError': '',
		};
	}	

	render(){
		return (
			<div className="login">
				<div className="loginBox">
					<div>
						<label>Login Name</label>
						<input type="text" onChange={this._inputChanged.bind(this, 'name')} value={this.state.name}/>
					</div>	
					<div>
						<label>Password</label>
						<input type="password" onChange={this._inputChanged.bind(this, 'password')} value={this.state.password} />
					</div>
					<div className="text-center">
						<button className="loginButtonLogin" onClick={this._buttonClicked.bind(this, 'login')}>Login</button>
						<button className="loginButtonCancel" onClick={this._buttonClicked.bind(this, 'cancel')}>Cancel</button>
					</div>
				</div>
				{this.state.flashError?<span>{this.state.flashError}</span>:null}
			</div>
		);	
	}

	_buttonClicked(type, e){
		e.preventDefault();
		if(type === 'cancel'){
			router.setRoute('/');
		} else {
			if(!this.state.name || !this.state.password){
				this.setState({flashError: 'user name and password are required'});
			}
			else{
				Parse.User.logIn(this.state.name, this.state.password)
					.done(()=>{
						router.setRoute(this.props.returnUrl);
					})
					.fail(()=>{
						this.setState({flashError: 'incorrect user name or password'});
					})
			}
		}
	}

	_inputChanged(name, e){
		var newState = {};
		newState[name] = e.target.value;
		this.setState(newState);
	}
}

module.exports = React.createClass(Login.prototype);