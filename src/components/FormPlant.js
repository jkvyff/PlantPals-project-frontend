import React, { Component } from 'react';
import { Rating, TextArea } from 'semantic-ui-react'
import { API_PLANT, API_ROOM_PLANT } from '../constants';

class FormPlant extends Component {

	state = {
		nickname: "",
		commonName: "",
		scientificName: "",
		temp: "",
		tempTol: "",
		humid: "",
		light: "",
		lightTol: "",
		difficulty: "",
		toxic: true,
		notes: ""
	}

	fillFormFromProps = (plant) => {
				const { common_name, scientific_name, humidity_pref, light_pref, light_tolerance, temp_f, temp_tolerance, difficulty, toxic} = plant
				this.setState({
					commonName: common_name,
					scientificName: scientific_name,
					temp: temp_f,
					tempTol: temp_tolerance,
					humid: humidity_pref,
					light: light_pref,
					lightTol: light_tolerance,
					difficulty: difficulty,
					toxic: toxic,
				})
	}

	handleChange = ev => {
		this.setState({
			[ev.target.name]: ev.target.value
		})
	}

  handleRating = (ev, {rating}) => {
		this.setState({
			difficulty: rating
		})
  }

  toggleCheckbox = ev => {
		this.setState(prevState => (
  		{ toxic: !prevState.toxic }
  	));
  }

	createPlant = () => {
		const { commonName, scientificName, temp, tempTol, humid, light, lightTol, difficulty, toxic } = this.state
		const token =  this.props.getToken()
		const payload = JSON.stringify({
			plant: {
				common_name: commonName,
				scientific_name: scientificName,
				temp_f: temp,
				temp_tolerance: tempTol,
				light_pref: light,
				light_tolerance: lightTol,
				humidity_pref: humid,
				difficulty: difficulty,
				toxic: toxic
			}
		})
		fetch(API_PLANT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			  Accept: 'application/json',
				'Authorization': 'Bearer ' + token
			},
			body: payload
		})
		.then(res => res.json())
		.then(json => this.createRoomPlant(json.plant))
	}

	createRoomPlant = plant => {
		const token =  this.props.getToken()
		const payload = JSON.stringify({
			room_plant: {
				room_id: this.props.selected.id,
				plant_id: plant.id,
				nickname: this.state.nickname,
				notes: this.state.notes,
				watering_delay_days: 7
			}
		})
		console.log(plant, "payload", payload)
		fetch(API_ROOM_PLANT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'Authorization': 'Bearer ' + token
			},
			body: payload
		 })
		.then(res => res.json())
		.then(json => console.log(json))
	}

  handleSubmit = ev => {
		ev.preventDefault()
		this.createPlant()
	}

	componentWillReceiveProps(newProps) {
		const oldPlant = this.props.resultPlant;
		if(newProps.resultPlant!==oldPlant && newProps.resultPlant!==undefined) {this.fillFormFromProps(newProps.resultPlant)}
	}

	render() {
		return (
			<div>
				<h1>New Plant Form</h1><br />
				<form className="ui equal width form" onSubmit={this.handleSubmit} >
					<div className="fields">
						<div className="field">
							<label>Nickname</label>
							<input type="text" name="nickname"  placeholder="Nickname" onChange={this.handleChange} />
						</div>
						<div className="field">
							<label>Common Name</label>
							<input type="text" name="commonName" value={this.state.commonName} placeholder="Common Name" onChange={this.handleChange} />
						</div>
						<div className="field">
							<label>Scientific Name</label>
							<input type="text" name="scientificName" value={this.state.scientificName} placeholder="Scientific Name" onChange={this.handleChange} />
						</div>
					</div>
					<div className="fields">
						<div className="field">
							<label>Temperature °F</label>
							<input type="text" name="temp" value={this.state.temp} placeholder="Preferred Temperature" onChange={this.handleChange} />
						</div>
						<div className="field">
							<label>Temperature Tolerance °F +/- </label>
							<input type="text" name="tempTol" value={this.state.tempTol} placeholder="Temperature Tolerance" onChange={this.handleChange} />
						</div>
					</div>
					<div className="fields">
						<div className="field">
							<label>Humidity %</label>
							<input type="text" name="humid" value={this.state.humid} placeholder="Preferred Humidity" onChange={this.handleChange} />
						</div>
					</div>
					<div className="fields">
						<div className="field">
							<label>Light Exposure</label>
							<select className="ui fluid dropdown" name="light" value={this.state.light} placeholder="Light Exposure" onChange={this.handleChange} >
								<option value="">Light Exposure</option>
								<option value="5">Direct Sunlight</option>
								<option value="4">Indirect light full day</option>
								<option value="3">Indirect light for half the day</option>
								<option value="2">Indirect light for a few hours</option>
								<option value="1">Minimal light</option>
							</select>
						</div>
						<div className="field">
							<label>Light Exposure Tolerance +/- </label>
							<select className="ui fluid dropdown" name="lightTol" value={this.state.lightTol} placeholder="Light Exposure Tolerance" onChange={this.handleChange} >
								<option value="">Light Exposure Tolerance</option>
								<option value="4">4</option>
								<option value="3">3</option>
								<option value="2">2</option>
								<option value="1">1</option>
							</select>
						</div>
					</div>
					<div className="fields">
						<div className="eight wide field">
							<label>Difficulty of Care Rating</label>
							<Rating maxRating={5} rating={this.state.difficulty} icon='star' size='huge' name="difficulty" onRate={this.handleRating}  />
						</div>
						<div className="two wide field"></div>
						<div className="four wide ui toggle checkbox field">
							<input type="checkbox" tabIndex="0" checked={this.state.toxic}  onChange={this.toggleCheckbox}  />
							<label>Toxic for Pets</label>
						</div>
						<div className="two wide field"></div>
					</div>
					<div className="fields">
						<div className="eight wide field">
							<label>Plant Care Notes</label>
							<TextArea rows={2} name="notes" placeholder='Write some care instructions' onChange={this.handleChange} />
						</div>
					</div>
					<button className="ui submit button">Submit</button>
				</form>
			</div>
		)
	}
}

export default FormPlant
