import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Profile extends Component {
    constructor(){
        super()
        this.state = {
        }

    //Hard bind clearStorage to this object    
    this.clearStorage = this.clearStorage.bind(this)
    }
    //Send Auth Token back to server
    componentDidMount(){

        //Abstract out Later
        const payload = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('Authorization')
            },
        }       

        //Make fetch call with payload Object
        fetch('/api/profile', payload)
        .then(response => response.json)
        .then(response => console.log('Do something with response data'))
        .catch(err => console.log(err))
    }

    clearStorage(){
        sessionStorage.removeItem('Authorization')
    }

    render(){
        return(
            <div>
                <Link to='/' onClick={this.clearStorage}>Logout</Link>
                <h1>Profile Page</h1>
            </div>
            )
    }
}

export default Profile