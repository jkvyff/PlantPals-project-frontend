import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Rating, TextArea } from 'semantic-ui-react'
import { API_ROOT } from '../constants';

class FormPlant extends Component {

	state = {
		nickname: "",
		commonName: "",
		scientificName: "",
		temp: "",
		tempTol: "",
		humid: "",
		humidTol: "",
		lightExpo: "",
		lightTol: "",
		difficultyRating: "",
		toxic: true,
		notes: "",
		searchTerm: ""
	}

	componentDidMount() {
		
	}

	handleChange = ev => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    handleRating = (ev, {rating}) => {
        this.setState({
            difficultyRating: rating
        })
    }

    toggleCheckbox = ev => {
    	this.setState(prevState => (
    		{ toxic: !prevState.toxic }
    	));
    }

    handleSubmit = ev => {
		ev.preventDefault()
		fetch(`${API_ROOT}/new`, {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
		},
    }

	render() {
		return (
			<div> 
				<h1>New Plant Form</h1><br />
				<div class="ui equal width form" onSubmit={this.handleSubmit} >
					<div class="fields">
						<div class="field">
							<label>Nickname</label>
							<input type="text" name="nickname" placeholder="Nickname" onChange={this.handleChange} />
						</div>
						<div class="field">
							<label>Common Name</label>
							<input type="text" name="commonName" placeholder="Common Name" onChange={this.handleChange} />
						</div>
						<div class="field">
							<label>Scientific Name</label>
							<input type="text" name="scientificName" placeholder="Scientific Name" onChange={this.handleChange} />
						</div>
					</div>
					<div class="fields">
						<div class="field">
							<label>Temperature °F</label>
							<input type="text" name="temp" placeholder="Prefered Temperature" onChange={this.handleChange} />
						</div>
						<div class="field">
							<label>Temperature Tolerance °F +/- </label>
							<input type="text" name="tempTol" placeholder="Temperature Tolerance" onChange={this.handleChange} />
						</div>
					</div>
					<div class="fields">
						<div class="field">
							<label>Humidity %</label>
							<input type="text" name="humid" placeholder="Prefered Humidity" onChange={this.handleChange} />
						</div>
						<div class="field">
							<label>Humidity Tolerance % +/- </label>
							<input type="text" name="humidTol" placeholder="Humidity Tolerance" onChange={this.handleChange} />
						</div>
					</div>
					<div class="fields">
						<div class="field">
							<label>Light Exposure</label>
							<select class="ui fluid dropdown" name="lightExpo" placeHolder="Light Exposure" onChange={this.handleChange} >
								<option value="">Light Exposure</option>
								<option value="5">Direct Sunlight</option>
								<option value="4">Indirect light full day</option>
								<option value="3">Indirect light for half the day</option>
								<option value="2">Indirect light for a few hours</option>
								<option value="1">Minimal light</option>
							</select>
						</div>
						<div class="field">
							<label>Light Exposure Tolerance +/- </label>
							<select class="ui fluid dropdown" name="lightTol" placeHolder="Light Exposure Tolerance" onChange={this.handleChange} >
								<option value="">Light Exposure Tolerance</option>
								<option value="4">4</option>
								<option value="3">3</option>
								<option value="2">2</option>
								<option value="1">1</option>
							</select>
						</div>
					</div>
					<div class="fields">
						<div class="eight wide field">
							<label>Difficulty of Care Rating</label>
							<Rating maxRating={5} minRating={1} defaultRating={1} value={this.state.difficultyRating} icon='star' size='huge' name="difficultyRating" onRate={this.handleRating}  />
						</div>
						<div class="two wide field"></div>
						<div class="four wide ui toggle checkbox field">
							<input type="checkbox" tabindex="0" checked={this.state.toxic}  onChange={this.toggleCheckbox}  />
							<label>Toxic for Pets</label>
						</div>
						<div class="two wide field"></div>
					</div>
					<div class="fields">
						<div class="eight wide field">
							<label>Plant Care Notes</label>
							<TextArea rows={2} name="notes" placeholder='Write some care instructions' onChange={this.handleChange} />
						</div>
					</div>
					<div class="ui submit button">Submit</div>
				</div>
			</div>
		)
	}
}

export default FormPlant