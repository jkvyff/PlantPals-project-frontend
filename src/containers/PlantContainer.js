import React, {Component} from 'react'
import Plant from '../components/Plant'
import { Card } from 'semantic-ui-react'

class PlantContainer extends Component {
	render() {
		return (
			<div>
				<h1>Your Plants {this.props.room.name ? "in " + this.props.room.name : null}</h1>
				{this.props.room ?
					<Card.Group itemsPerRow={3} >
						{this.props.room && this.props.room.room_plants && this.props.room.room_plants.map(plant => {
							return <Plant key={plant.id} plant={plant} />
						})}
					</Card.Group>
				: <h3>Select a room to see its plants.</h3>}
			</div>
		)
	}
}

export default PlantContainer
