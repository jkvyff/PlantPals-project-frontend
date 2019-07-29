import React, {Component} from 'react'
import Profile from "../components/Profile"
import FormRoom from "../components/FormRoom"
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

	handleClickProfile = () => {
		this.setState({selected: ""})
	}

	handleClick = card => {
		this.setState({selected: card})
	}

	render() {
		return (
			<div className="HomeContainer"><br /><br />
				<div className="ui middle divided aligned stackable grid container">
					<div className="row">
						<div className="four wide column">
							<Profile user={this.props.user} handleClick={this.handleClickProfile} />
						</div>
						<div className="twelve wide column">
							<PlantContainer room={this.state.selected} handleClick={this.handleClick} />
						</div>
					</div>
					<div className="row">
						<RoomContainer rooms={this.props.user.rooms} handleClick={this.handleClick} />
					</div>
					{this.state.selected &&
						this.state.selected === "NEW" ?
						<div className="row">
							<FormRoom selected={this.state.selected} getToken={this.props.getToken}/>
						</div>
						:
						<div className="row">
							<FormPlant selected={this.state.selected} getToken={this.props.getToken}/>
						</div>
					}
				</div>
			</div>
		);
	}
}

export default HomeContainer
