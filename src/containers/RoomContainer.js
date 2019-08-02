import React, {Component} from 'react'
import Room from '../components/Room'
import { Card } from 'semantic-ui-react'

class RoomContainer extends Component {

	handleClick = ev => {
		this.props.handleClick("NEW")
	}

	render() {
		return (
			<div style={{minWidth: '85vw'}}>
				<h1>Your Plant Rooms</h1>
				<Card.Group itemsPerRow={3}>
					{this.props.rooms && this.props.rooms.map(room => {
						return <Room
										key={room.id}
										room={room}
										handleClick={this.props.handleClick}
										handleCreateRoom={this.props.handleCreateRoom}
										handleDeleteRoom={this.props.handleDeleteRoom}
										getToken={this.props.getToken} />
					})}
					<Card color="green" className="new" onClick={this.handleClick}>
						<Card.Content ><br /><br /><br /><br />
							<Card.Header>
								Click Me<br />
								to add a new Room<br /><br /><br /><br />
							</Card.Header>
						</Card.Content>
					</Card>
				</Card.Group>
			</div>
		)
	}
}

export default RoomContainer
