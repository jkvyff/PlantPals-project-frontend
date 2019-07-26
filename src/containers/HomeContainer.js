import React, {Component} from 'react'
import { API_ROOT } from '../constants';
import dahlia from "../images/DahliaHeader.jpg"
import Logo from "../images/plant.svg"
import Profile from "../components/Profile"
import FormPlant from "../components/FormPlant"
import RoomContainer from "../containers/RoomContainer"
import PlantContainer from "../containers/PlantContainer"



class HomeContainer extends Component {

	state = {
		user: {},
		selected: ""
	}

	componentDidMount() {
		const token = this.props.getToken()
		if (!token) {
			this.props.history.push('/login')
		} else {
			this.props.getProfile()
		}
	}

	handleClick = room => {
		console.log(room)
		this.setState({selected: room})
	}

	render() {
		return (
			<div className="HomeContainer"><br /><br />
				<div className="ui middle divided aligned stackable grid container">
					<div className="row">
						<div className="four wide column">
							<Profile user={this.props.user} />
						</div>
						<div className="twelve wide column">
							<PlantContainer room={this.state.selected} handleClick={this.handleClick} />
						</div>
					</div>
					<div className="row">
						<RoomContainer rooms={this.props.user.rooms} handleClick={this.handleClick} />
					</div>
					{this.state.selected &&
					<div className="row">
						<FormPlant selected={this.state.selected} />
					</div>}
				</div>
			</div>
		);
	}
}

export default HomeContainer