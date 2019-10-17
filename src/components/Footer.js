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
							<p className="item" >Refer any questions or bugs to my:</p>
							<a href="https://twitter.com/JKVyff" target="_blank" rel="noopener noreferrer">
								<p>Twitter</p>
							</a>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Footer)
