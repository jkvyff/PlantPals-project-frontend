import React, {Component} from 'react'
import { Item, Menu, Form, Button } from 'semantic-ui-react'
import { API_PLANT } from '../constants';
import Profile from "../components/Profile"
import FormRoom from "../components/FormRoom"
import FormPlant from "../components/FormPlant"
import RoomContainer from "../containers/RoomContainer"
import PlantContainer from "../containers/PlantContainer"


class HomeContainer extends Component {

	state = {
		selected: "",
		searchTerm: "",
		results: [],
		plant: ""
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

	handleSearchChange = (ev, {value}) => {
		this.setState({searchTerm: value, plant: ""}, () => {
			this.fetchPlants()
		})
	}

	handleResultSelect = (ev, {name}) => {
		this.setState({ plant: name })
	}

	foundPlant = () => {
		return this.state.results.find(plant => plant.common_name === this.state.plant)
	}

	fetchPlants = () => {
		const token =  this.props.getToken()
		fetch(API_PLANT+`?q=${this.state.searchTerm}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			  Accept: 'application/json',
				'Authorization': 'Bearer ' + token
			}
		})
		.then(res => res.json())
		.then(plants => this.setState({results: plants}))
	}

	recommendPlant = () => {
		const { temp_F, light, humidity, pet_access } = this.state.selected
		const payload = `?plant_care_rating=${this.props.user.plant_care_rating}&temp_f=${temp_F}&light=${light}&humidity=${humidity}&pet_access=${pet_access}`
		const token =  this.props.getToken()
		fetch(API_PLANT+payload, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			  Accept: 'application/json',
				'Authorization': 'Bearer ' + token
			}
		})
		.then(res => res.json())
		.then(plant => this.setState({results: [plant], plant: plant.common_name}))
	}

	render() {
		return (
			<div className="HomeContainer"><br /><br />
				<div className="ui middle aligned stackable grid container">
					<div className="row">
						<div className="four wide column">
							<Profile user={this.props.user} handleClick={this.handleClickProfile} />
						</div>
						<div className="twelve wide column">
							<PlantContainer
								room={this.state.selected}
								handleClick={this.handleClick} />
						</div>
					</div>
					<div className="row">
						<RoomContainer
							rooms={this.props.user.rooms}
							handleClick={this.handleClick}
							handleCreateRoom={this.props.handleCreateRoom}
							handleDeleteRoom={this.props.handleDeleteRoom}
							getToken={this.props.getToken} />
					</div>
					{this.state.selected && (
						this.state.selected === "NEW" ?
						<div className="row">
							<FormRoom
								selected={this.state.selected}
								getToken={this.props.getToken}
								handleCreateRoom={this.props.handleCreateRoom}
								user_id={this.props.user.id} />
						</div>
						:
						<div className="row">
						<FormPlant
							selected={this.state.selected}
							resultPlant={this.foundPlant()}
							getToken={this.props.getToken} />
							<div className="two wide column"></div>
							<div>
								<h2><b>Recommend a plant</b></h2>
								<Button content="Recommend" onClick={this.recommendPlant}/>
								<h2><b>Search for a plant</b></h2>
								<Menu vertical>
									<Form.Input fluid
										icon='search'
										placeholder='Input Name/Species'
										value={this.state.searchTerm}
										onChange={this.handleSearchChange}
									/>
									{this.state.searchTerm && this.state.results.map(plant =>
									<Menu.Item
										key={plant.id}
										name={plant.common_name}
										active={this.state.plant === plant.common_name}
										onClick={this.handleResultSelect} >
											<Item.Header>{plant.common_name}</Item.Header>
											<Item.Meta>{plant.scientific_name}</Item.Meta>
									</Menu.Item>
									)}
								</Menu>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default HomeContainer
