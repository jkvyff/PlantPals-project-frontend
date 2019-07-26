import React, {Component} from 'react'
import { API_BASE } from '../constants';
import { Card, Image } from 'semantic-ui-react'


class Plant extends Component {

	handleClick = () => {
		console.log("hello i'm ", this.props.plant.nickname)
	}

	render() {
		const { nickname, notes, watering_delay_days, plant } = this.props.plant
		const { common_name, scientific_name, difficulty, humidity_pref, light_pref, temp_f, toxic } = plant
		return (
		<Card color="blue" onClick={this.handleClick}>
			<Card.Content>
				<Card.Header>{nickname}</Card.Header>
				<Card.Meta>{scientific_name}</Card.Meta>
				<Card.Description>
					Difficulty: {[...Array(difficulty)].map((e, i) => <i className="icon star orange" />)}<br />
					Toxic to pets: {toxic ? "Yes" : "No"} {toxic ? <i className="icon heartbeat red" /> : <i className="icon heart green" /> }<br /><br />

					{notes}<br />
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				Water every {watering_delay_days} days
			</Card.Content>
		</Card>
		)
	}
}

export default Plant