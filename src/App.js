import React, { Component } from 'react';
import './App.css';
import { API_ROOT } from './constants';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar'
import HomeContainer from './containers/HomeContainer'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Footer from './components/Footer'

class App extends Component {

	state = {
		user: {}
	}

	logout = event => {
		this.clearToken()
		this.setState({ user: '' })
	}

	clearToken(jwt) {
		localStorage.setItem('jwt', '')
	}

	getToken() { return localStorage.getItem('jwt')}

	saveToken(jwt) {
		localStorage.setItem('jwt', jwt)
	}
	  
	getProfile = () => {
		let token = this.getToken()
		if (token) {
			fetch(`${API_ROOT}/profile`, {
				headers: {
					'Authorization': 'Bearer ' + token
				}
			})
			.then(resp => resp.json())
			.then(json => {
				console.log('profile:', json)
				this.setState({ user: json.user })
			})
		}
	}

	getSignUp = (event, person) => {
		event.preventDefault()
		console.log(person)

		let username = person.username
		let password = person.password

		fetch(`${API_ROOT}/new`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ user: { username, password } })
		})
		.then(resp => resp.json())
		.then(json => {
			console.log('login:', json)
			if (json && json.jwt) {
				this.saveToken(json.jwt)
				this.setState({ user: {username}})
			}
		})
		.then(() => {
			this.getProfile()
		})
	}

	render() {
		return (
			<Router>
				<div className="App">
					<NavBar user={this.state.user} getProfile={this.getProfile} onLogout={this.logout} />
					<Route exact path='/' render={(props) => 
						<HomeContainer {...props} {...this.state} getToken={this.getToken} getProfile={this.getProfile} />} 
					/>
					<Route exact path="/login" render={ (props) => 
						<Login {...props} onLogin={this.getProfile} onLogout={this.logout}/>} 
					/>
					<Route path='/signup' render={(props) => <SignUp
						{...props} onSignUp={this.getSignUp} />}
					/>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
