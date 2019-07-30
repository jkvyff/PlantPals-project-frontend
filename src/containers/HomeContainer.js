import React, {Component} from 'react'
import { Search, Item, Menu, Input, Form } from 'semantic-ui-react'
import { API_PLANT } from '../constants';
import Profile from "../components/Profile"
import FormRoom from "../components/FormRoom"
import FormPlant from "../components/FormPlant"
import RoomContainer from "../containers/RoomContainer"
import PlantContainer from "../containers/PlantContainer"


class HomeContainer extends Component {

	state = {
		user: {},
		selected: "",
		searchTerm: "",
		results: []
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
		this.setState({searchTerm: value})
		this.fetchPlants()
	}

	handleResultSelect = (ev, {result}) => {
		this.setState({ results: result.common_name })
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
		.then(plants => {
			const filtered = plants
			console.log(filtered)
			this.setState({results: filtered})
		})
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
							<PlantContainer room={this.state.selected} handleClick={this.handleClick} />
						</div>
					</div>
					<div className="row">
						<RoomContainer rooms={this.props.user.rooms} handleClick={this.handleClick} />
					</div>
					{this.state.selected && (
						this.state.selected === "NEW" ?
						<div className="row">
							<FormRoom selected={this.state.selected} getToken={this.props.getToken}/>
						</div>
						:
						<div className="row">
							<FormPlant selected={this.state.selected} getToken={this.props.getToken}/>
							<div className="two wide column"></div>
							<div>
							<h2><b>Search for a plant</b></h2>
								<Menu vertical>
									<Menu.Item>
										<Form.Input fluid icon='search' placeholder='Input Name/Species' value={this.state.searchTerm} onChange={this.handleSearchChange} />
									</Menu.Item>
									{this.state.results.map(plant =>
									<Menu.Item name={plant.common_name} >
										<Item.Content>
											<Item.Header>{plant.common_name}</Item.Header>
											<Item.Meta>{plant.scientific_name}</Item.Meta>
										</Item.Content>
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
