import React, { Component } from 'react'
import {
    NavLink,
    withRouter
} from 'react-router-dom';
import Logo from "../images/plant.svg"

class Footer extends Component {

	render() {
		return (
			<div className="footer">
				<div className="ui inverted vertical footer segment">
					<div className="ui center aligned container">
						<img src={Logo} className="ui centered mini image"></img>
						<div className="ui horizontal inverted small divided link list">
							<a className="item" href="#">Contact Us</a>
							<a className="item" href="#">Terms and Conditions</a>
							<a className="item" href="#">Privacy Policy</a>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Footer)