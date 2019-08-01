import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import { API_ROOT } from '../constants';
import Dropzone from 'react-dropzone';

const style = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
}

const options = [
    {
        key: '1 - Sprout',
        text: '1 - Sprout',
        value: 1
    },
    {
        key: '2 - Seedling',
        text: '2 - Seedling',
        value: 2
    },
    {
        key: '3 - Budding',
        text: '3 - Budding',
        value: 3
    },
    {
        key: '4 - Flowering',
        text: '4 - Flowering',
        value: 4
    },
    {
        key: '5 - One with the trees',
        text: '5 - One with the trees',
        value: 5
    }
]

class SignUp extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            rating: '',
            avatar: null,
            preview: null
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        const { username, password, rating, avatar } = this.state

        let data = new FormData()
        data.append('username', username)
        data.append('password', password)
        data.append('plant_care_rating', rating)
        data.append('avatar', avatar)

        fetch(`${API_ROOT}/users`, {
            method: 'POST',
            body: data,
        })
        .then(res => res.json())
        .then(json => console.log(json))
        .then(() => this.props.history.push('/'))
        .catch(e => console.log(e))
    };

    handleFileDrop = file => {
        const reader = new FileReader()
        reader.readAsDataURL(file[0])
        reader.onloadend = ev => {
            this.setState({
                avatar: file[0],
                preview: reader.result
            });
        }
    };

    handleChange = event => {
        event.preventDefault()
        console.log(event.target)
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSelectChange = (event, data) => {
        this.setState({
            rating: data.value
        })
    };


    render() {
        const { rating } = this.state
        return (
            <div className="signup">
                <div className="page-login"><br />
                    <div className="ui centered grid container">
                        <div className="nine wide column">
                            <div className="ui warning message">
                                <div className="content">
                                    <div className="header">
                                        Signup!
                                        </div>
                                    <p>Please Sign Up To Find a new Plant Pal!</p>
                                </div>
                            </div>
                            <div className="content">
                                <form className="ui form" onSubmit={this.handleSubmit}>
                                    <div className="field">
                                        <label>Enter Username</label>
                                        <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}></input>
                                    </div>
                                    <div className="field">
                                        <label>Enter Password</label>
                                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}></input>
                                    </div>
                                    <label>Select Plant Level</label>
                                    <Dropdown
                                        placeholder='Select Comfort Level of Plant Care'
                                        fluid
                                        selection
                                        onChange={this.handleSelectChange}
                                        options={options}
                                        value={rating}
                                    /><br />
                                    <Dropzone accept="image/*" onDrop={this.handleFileDrop}  >
                                      {({getRootProps, getInputProps}) => (
                                        <div className="dropzone">
                                            <div {...getRootProps({style})}>
                                                <input {...getInputProps()} />
                                                {this.state.avatar ?
                                                    <div>
                                                        <h2>Profile Picture</h2>
                                                        <img width="200px" src={this.state.preview} alt="profile"/>
                                                    </div>
                                                : <p>Drag 'n' drop an image here, or click to select a file</p>}
                                            </div>
                                        </div>
                                      )}
                                    </Dropzone><br />
                                    <button className="ui primary button" type="submit">
                                        Sign Up!
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div><br />
            </div>
        )
    }
}

export default withRouter(SignUp);
