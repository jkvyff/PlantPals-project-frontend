import React, { Component } from 'react'
import { Card, Image, Button, Icon } from 'semantic-ui-react'


class Room extends Component {

	handleClick = () => {
		this.props.handleClick(this.props.room)
	}

	handleDelete = () => {
		this.props.handleDeleteRoom(this.props.room.id)
	}

	render() {
		const { humidity, light, name, pet_access, room_plants, temp_F } = this.props.room
		return (
			<Card color="green" style={{ minWidth: 230 }} onClick={this.handleClick}>
				<Card.Content>
					<Button basic onClick={this.handleDelete} className="mini right floated icon" color='red'><Icon name='x'/></Button>
				</Card.Content>
				<Image wrapped src="https://www.bhg.com.au/media/18730/06072018-indoor-plants.jpg?width=400&mode=crop&center=0.0,0.0" />
				<Card.Content>
					<Card.Header>{name}</Card.Header>
					<Card.Description>
						Light: {[...Array(light)].map((e, i) => <i key={i} className="icon sun yellow" />)}<br />
						Temperature: {temp_F}°F <i className="icon thermometer half red" /><br />
						Humidity: {humidity}%<br />
						{pet_access ? "" : "No"} Pet Access {pet_access ? <i className="icon sticker mule green" /> : <i className="icon sticker mule orange" />}
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
				<div>
		      <i className="icon tree green" />
		    	{room_plants.length} Room Plants
		    </div>
				</Card.Content>
			</Card>
		)
	}
}

export default Room
