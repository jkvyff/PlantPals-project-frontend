import React, { Component } from 'react';
import './App.css';
import { API_ROOT, API_ROOM } from './constants';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar'
import HomeContainer from './containers/HomeContainer'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Footer from './components/Footer'

class App extends Component {

	state = {
		user: ''
	}

	logout = event => {
		this.clearToken()
		this.setState({ user: '' })
	}

	clearToken(jwt) { localStorage.setItem('jwt', '') }

	getToken() { return localStorage.getItem('jwt') }

	saveToken(jwt) { localStorage.setItem('jwt', jwt) }

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

	handleCreatePlant = ({room_plant}) => {
		const {room} = room_plant
		let i
		for (i in this.state.user.rooms) {
			if (this.state.user.rooms[i].id === room.id) break
		}
		let newState = {
			...this.state,
			user: {
				...this.state.user,
				rooms: [...this.state.user.rooms]
			}
		}
		let newRoom = newState.user.rooms[i]
		newRoom.room_plants.push(room_plant)
		newState.user.rooms[i] = newRoom
		this.setState(prevState => ({user: newState.user}));
	}

	handleCreateRoom = room => {
		this.setState(prevState => ({
			...prevState,
			user: {
				...prevState.user,
				rooms: [...prevState.user.rooms, room]
			}
		}))
	}

	handleDeleteRoom = room_id => {
		const token = this.getToken();
		fetch(`${API_ROOM}/${room_id}`, {
			method: 'DELETE',
			headers: {
				'Authorization': 'Bearer ' + token
			}
		})
		.then(res => res.json())
		.then(json => this.setState(prevState => ({
			...prevState,
			user: {
				...prevState.user,
				rooms: prevState.user.rooms.filter(room =>
					{return room.id !== room_id})
			}
		})))
		.catch(err => console.log(err))
	}

	handleSelfRate = rating => {
		const token = this.getToken();
		fetch(`${API_ROOT}/users/${this.state.user.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			  Accept: 'application/json',
				'Authorization': 'Bearer ' + token
			},
			body: JSON.stringify( {user: { plant_care_rating: rating }} )
		})
		.then(res => res.json())
		.then(json => this.setState(json))
		.catch(err => console.log(err))
	}

	render() {
		return (
			<Router>
				<div className="App">
					<NavBar user={this.state.user} getProfile={this.getProfile} onLogout={this.logout} />
					<Route exact path='/' render={(props) =>
						<HomeContainer {...props} {...this.state}
							getToken={this.getToken}
							getProfile={this.getProfile}
							handleCreateRoom={this.handleCreateRoom}
							handleDeleteRoom={this.handleDeleteRoom}
							handleSelfRate={this.handleSelfRate}
							handleCreatePlant={this.handleCreatePlant} />}
					/>
					<Route exact path="/login" render={ (props) =>
						<Login {...props}
							onLogin={this.getProfile}
							onLogout={this.logout}/>}
					/>
					<Route path='/signup' render={ (props) => <SignUp
						{...props} onSignUp={this.getSignUp} />}
					/>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
