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
				<form className="loginForm" onSubmit={this._onFormSubmit}>
					<div>
						<label>Login Name</label>
						<input type="text" required onChange={this._onInputChange.bind(this, 'name')} value={this.state.name}/>
					</div>	
					<div>
						<label>Password</label>
						<input type="password" required onChange={this._onInputChange.bind(this, 'password')} value={this.state.password} />
					</div>
					<div className="text-center">
						<input type="submit" className="loginButtonLogin" value="Login" />
						<button className="loginButtonCancel" onClick={this._onButtonClick.bind(this, 'cancel')}>Cancel</button>
					</div>
				</form>
				{this.state.flashError?<span className="error">{this.state.flashError}</span>:null}
			</div>
		);	
	}

	_onFormSubmit(e){
		e.preventDefault();

		if(!this.state.name || !this.state.password){
			this.setState({flashError: '* user name and password are required'});
		}
		else{
			Parse.User.logIn(this.state.name, this.state.password)
				.done(()=>{
					router.setRoute(this.props.returnUrl);
				})
				.fail(()=>{
					this.setState({flashError: '* incorrect user name or password'});
				})
		}

	}

	_onButtonClick(type, e){
		e.preventDefault();

		if(type === 'cancel'){
			router.setRoute('/');
		} 

	}

	_onInputChange(name, e){
		var newState = {};
		newState[name] = e.target.value;
		this.setState(newState);
	}
}

module.exports = React.createClass(Login.prototype);