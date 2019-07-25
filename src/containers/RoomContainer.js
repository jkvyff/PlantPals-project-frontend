import React, {Component} from 'react'
import { API_ROOT } from '../constants';
import Room from '../components/Room'
import { Card } from 'semantic-ui-react'

class RoomContainer extends Component {

	render() {
		return (
			<div>
				<h1>Your Plant Rooms</h1>
				<Card.Group itemsPerRow={3}>
					{this.props.rooms && this.props.rooms.map(room => {
						return <Room key={room.id} room={room} handleClick={this.props.handleClick} />
					})}
				</Card.Group>
			</div>
		)
	}
}

export default RoomContainer