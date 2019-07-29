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

  handleSubmit = ev => {
		ev.preventDefault()
		const { nickname, commonName, scientificName, temp, tempTol, humid, light, lightTol, difficulty, toxic, notes } = this.state
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
		.then(json => {
			const payload2 = JSON.stringify({
				room_plant: {
					room_id: this.props.selected.id,
					plant_id: json.plant.id,
					nickname: nickname,
					notes: notes,
					watering_delay_days: 7
				}
			})
			console.log(json, "payload2", payload2)
			fetch(API_ROOM_PLANT, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				  Accept: 'application/json',
					'Authorization': 'Bearer ' + token
				},
				body: payload2
			 })
			.then(res => res.json())
			.then(json => console.log(json))
		})
	}

	render() {
		return (
			<div>
				<h1>New Plant Form</h1><br />
				<form className="ui equal width form" onSubmit={this.handleSubmit} >
					<div className="fields">
						<div className="field">
							<label>Nickname</label>
							<input type="text" name="nickname" placeholder="Nickname" onChange={this.handleChange} />
						</div>
						<div className="field">
							<label>Common Name</label>
							<input type="text" name="commonName" placeholder="Common Name" onChange={this.handleChange} />
						</div>
						<div className="field">
							<label>Scientific Name</label>
							<input type="text" name="scientificName" placeholder="Scientific Name" onChange={this.handleChange} />
						</div>
					</div>
					<div className="fields">
						<div className="field">
							<label>Temperature °F</label>
							<input type="text" name="temp" placeholder="Preferred Temperature" onChange={this.handleChange} />
						</div>
						<div className="field">
							<label>Temperature Tolerance °F +/- </label>
							<input type="text" name="tempTol" placeholder="Temperature Tolerance" onChange={this.handleChange} />
						</div>
					</div>
					<div className="fields">
						<div className="field">
							<label>Humidity %</label>
							<input type="text" name="humid" placeholder="Preferred Humidity" onChange={this.handleChange} />
						</div>
					</div>
					<div className="fields">
						<div className="field">
							<label>Light Exposure</label>
							<select className="ui fluid dropdown" name="light" placeholder="Light Exposure" onChange={this.handleChange} >
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
							<select className="ui fluid dropdown" name="lightTol" placeholder="Light Exposure Tolerance" onChange={this.handleChange} >
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
							<Rating maxRating={5} defaultRating={1} value={this.state.difficulty} icon='star' size='huge' name="difficulty" onRate={this.handleRating}  />
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
