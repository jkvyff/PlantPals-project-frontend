import React, { Component } from 'react';
import { API_ROOM } from '../constants';

class FormRoom extends Component {

	state = {
		name: "",
    temp_F: "",
    light: "",
    humidity: "",
    pet_access: true,
    room_plants: []
	}

	handleChange = ev => {
		this.setState({
			[ev.target.name]: ev.target.value
		})
	}

  toggleCheckbox = ev => {
		this.setState(prevState => (
  		{ pet_access: !prevState.pet_access }
  	));
  }

  handleSubmit = ev => {
		ev.preventDefault()
		const { name, user_id, temp_F, light, humidity, pet_access } = this.state
		const token =  this.props.getToken()
		const payload = JSON.stringify({
			room: {
				name: name,
        user_id: user_id,
				temp_F: temp_F,
				light: light,
				humidity: humidity,
				pet_access: pet_access
			}
		})
		fetch(API_ROOM, {
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

	render() {
		return (
			<div>
				<h1>New Room Form</h1><br />
				<form className="ui equal width form" onSubmit={this.handleSubmit} >
					<div className="fields">
						<div className="field">

							<input type="text" name="name" placeholder="Room Name" onChange={this.handleChange} />
						</div>
            <div className="seven wide ui toggle checkbox field">
              <input type="checkbox" tabIndex="0" checked={this.state.pet_access}  onChange={this.toggleCheckbox}  />
              <label>Pets have access</label>
            </div>
					</div>
					<div className="fields">
						<div className="field">
							<label>Temperature °F</label>
							<input type="text" name="temp" placeholder="Average Temperature" onChange={this.handleChange} />
						</div>
						<div className="field">
							<label>Humidity %</label>
							<input type="text" name="humid" placeholder="Average Humidity" onChange={this.handleChange} />
						</div>
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
					</div>
					<button className="ui submit button">Submit</button>
				</form>
			</div>
		)
	}
}

export default FormRoom
