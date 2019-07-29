import React, {Component} from 'react'
import { API_BASE } from '../constants';
import { Rating, Image, Card } from 'semantic-ui-react'
import Logo from "../images/plant.svg"


class Profile extends Component {

	render() {
		const {username, plant_care_rating, avatar} = this.props.user
		return (
			<div>
				<Card color='orange' onClick={this.props.handleClick}>
					<Image src={avatar ? API_BASE+avatar.url : Logo } wrapped ui={false} rounded />
					<Card.Content>
						<Card.Header><i className="icon user circle" />{username}</Card.Header>
						<Card.Description>
							Plant Care Rating<br/>
							<Rating maxRating={5} rating={plant_care_rating} icon='star' size='huge' />
						</Card.Description>
					</Card.Content>

				</Card>
			</div>
		)
	}
}

export default Profile
