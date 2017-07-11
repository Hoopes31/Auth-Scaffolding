import React, { Component } from 'react'
import setHeader from './shared/setHeader'
import {Col, Row} from 'react-bootstrap';
class Profile extends Component {
    constructor(){
        super()
        this.state = {
            data: []
        }

    //Hard bind clearStorage to this object    
    this.clearStorage = this.clearStorage.bind(this)
    }
    //Send Auth Token back to server
    componentDidMount(){

        const token = localStorage.getItem('Authorization')

        //Make fetch call with payload Object
        fetch('/api/profile', setHeader('GET', token))
        .then(response => response.json())
        .then(response => this.setState({data: response.user}))
        .catch(err => console.log(err))
    }

    clearStorage(){
        localStorage.removeItem('Authorization')
    }

    render(){
        return(<Row>
                    <Col>
                        <h1>Welcome to the Profile Page</h1>
                        <h2>Happy Hacking, {this.state.data.firstName}.</h2>
                    </Col>
                </Row>)
    }
}

export default Profile