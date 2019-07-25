import React, { Component } from 'react';
import {
    NavLink,
    withRouter
} from 'react-router-dom';
import dahlia from "../images/DahliaHeader.jpg"
import Logo from "../images/plant.svg"

class NavBar extends Component {

    componentDidMount() {
        this.props.getProfile()
    }

    logout = event => {
        this.props.onLogout(event)
        this.props.history.push('/login')
    }

    render() {
        return (
            <div>
                <div id="header" >
                    <img src={dahlia} className="ui fluid image" />
                </div>
                <div className="ui borderless main menu">
                    <div className="ui text container">
                      <div className="item"><img className="svg" src={Logo}/></div>
                      <div className="item"><strong>Plant Pals</strong></div>
                      <div className="item"><NavLink to="/">My Plants</NavLink></div>
                      <div className="ui right floated item"><strong>{this.props.user ? "Hello " + this.props.user.username : null}</strong></div>
                      <div className="ui item" ><NavLink to="/login">Login</NavLink></div>
                      <div className="ui item" onClick={this.logout}>Logout</div>
                    </div>
                </div>
            </div>
           
        )
    }
}

export default withRouter(NavBar);