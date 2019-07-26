import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Logo from "../images/plant.svg"

class Footer extends Component {

	render() {
		return (
			<div className="footer">
				<div className="ui inverted vertical footer segment">
					<div className="ui center aligned container">
						<img src={Logo} className="ui centered mini image" alt="small plant"/>
						<div className="ui horizontal inverted small divided link list">
							<p className="item" >Contact Us</p>
							<p className="item" >Terms and Conditions</p>
							<p className="item" >Privacy Policy</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Footer)
