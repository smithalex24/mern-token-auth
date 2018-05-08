import React, { Component } from 'react';
import axios from 'axios';
class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: ''
		};
	}

	handleEmailChange = (e) => {
		this.setState({ email: e.target.value });
	}
	
	handlePasswordChange = (e) => {
		this.setState({ password: e.target.value });
	}


	handleSubmit = (e) => {
		e.preventDefault();
		console.log("form was submitted!", this.state);
		axios.post('/auth/login', this.state)
		.then(result => {
			console.log('SUCCESS!', result);
		})
		.catch(err => {
			console.log('ERROR', err.response.data);
		});
	}
	render() {
		return (
			<div>
				<h2>Login as an existing user</h2>
				<form onSubmit = {this.handleSubmit}>
					<div>
						<input name = "Email" placeholder = "What is your email?" value = {this.state.email} onChange = {this.handleEmailChange} />
					</div>
					<div>
						<input name = "Password" type = "password" value = {this.state.password} onChange = {this.handlePasswordChange} />
					</div>
					<input type = "submit" value = "Log Me In!!" className = "button" />
				</form>
			</div>
	
	
		);
	}
}

export default Login;