import React, {Component} from 'react'
import Plant from '../components/Plant'
import { Card } from 'semantic-ui-react'

class PlantContainer extends Component {

	render() {
		return (
			<div>
				<h1>Your Plants {this.props.room.name ? "in " + this.props.room.name : null}</h1>
				<Card.Group itemsPerRow={3}>
					{this.props.room && this.props.room.room_plants && this.props.room.room_plants.map(plant => {
						return <Plant key={plant.id} plant={plant} />
					})}
				</Card.Group>
			</div>
		)
	}
}

export default PlantContainer