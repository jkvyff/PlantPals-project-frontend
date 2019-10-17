import React, { Component } from 'react';
import {
    NavLink,
    withRouter
} from 'react-router-dom';
import { API_ROOT, HEADERS } from '../constants';


class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    constructor() {
        super()
        this.username = React.createRef()
        this.password = React.createRef()
        if (this.getToken()) {

        }
    }

    login = event => {
        event.preventDefault()
        console.log('log in')

        let username = this.username.current.value
        let password = this.password.current.value

        fetch(`${API_ROOT}/login`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({ user: {username, password}})
        })
        .then(resp => resp.json())
        .then(json => {
            console.log('login:', json)
            if (json && json.jwt) {
                this.saveToken(json.jwt)
                this.props.onLogin()
            }
        })
        .then(() => {
            if (username === '' || password === '') {
                alert("Please Enter In Username and password")
            } else {
                this.props.history.push('/')
            }
        })
    }

    logout = event => {
        this.props.onLogout(event)
    }

    saveToken(jwt) {
        localStorage.setItem('jwt', jwt)
    }

    clearToken(jwt) {
        localStorage.setItem('jwt', '')
    }

    getToken() {
        return localStorage.getItem('jwt')
    }

    render() {
        return (
            <div className="page-login"><br />
                <div className="ui centered grid container">
                    <div className="nine wide column">
                        <div className="ui warning message">
                            <div className="content">
	                            <div className="header">Plant Pals</div>
                                <p>Please Login to find a new plant pal!</p>
                            </div>
                        </div>

                        <div className="content">
                            <form className="ui form" method="POST">
                                <div className="field">
                                    <label>User</label>
                                    <input type="text" name="user" placeholder="User" ref={this.username}></input>
                                </div>
                                <div className="field">
                                    <label>Password</label>
                                    <input type="password" name="pass" placeholder="Password" ref={this.password}></input>
                                </div>
                                <button className="ui fluid large submit button" type="submit" onClick={this.login}>
                                    Login
                                </button>
                            </form>
                            <div className="ui error message">
                                <center>New User?  Sign up <NavLink to="/signup">Here!</NavLink></center>
                            </div>
                        </div>
                    </div>
                </div><br />
                <div className="buffer-log"></div>
            </div>
        )
    }
}

export default withRouter(Login);
