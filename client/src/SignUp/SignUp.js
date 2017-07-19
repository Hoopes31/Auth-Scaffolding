import React from 'react'
import setHeader from '../shared/setHeader'
import {Col,Row, Form, FormControl, Button} from 'react-bootstrap'
import {withRouter} from "react-router"
class SignUp extends React.Component {
    constructor(){
        super()
        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '',
            errorMessage: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.signUp = this.signUp.bind(this)
    }

    setToken(token) {
        localStorage.setItem('Authorization', token)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.signUp()
    }
    signUp(){
        if(!this.validateForm()) {
        }
        else {
            const body = JSON.stringify({
                    username: this.state.username,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password
            })

            fetch('/api/signUp', setHeader('POST', '', body))
            .then(response => response.json())
            .then((response) => {
                this.setToken(response.token)
                this.props.checkForToken()
                return response.token
            })
            .then(response => {this.props.history.push('/profile')})
            .catch((error) => {
                this.setState({errorMessage: error})
                console.warn(error)
            })
        }
    }
    validateForm () {
        //clear error message & set custom password validation
        this.setState({errorMessage: ''})
        if(this.state.password.length < 8) {
            this.setState({errorMessage: 'Password must be greater than 8 characters'})
            return false
        }
        else if (this.state.password !== this.state.passwordConfirm) {
            this.setState({errorMessage: 'Passwords do not match'})
            return false
        }
        else {
            return true
        }
    }

    render(){
    return(
        <Row className='SignUp'>
            <Col xs={10} xsOffset={1}>
                <h1>Sign Up!</h1>
                <Col xs={10} xsOffset={1}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormControl 
                            id='username' 
                            type='text' 
                            placeholder='Username'
                            required 
                            onChange={this.handleChange}/>
                            <br />
                        <FormControl 
                            id='firstName' 
                            type='text' 
                            placeholder='First Name' 
                            required
                            onChange={this.handleChange}/>
                            <br />
                        <FormControl 
                            id='lastName' 
                            type='text' 
                            placeholder ='Last Name' 
                            required
                            onChange={this.handleChange}/>
                            <br />
                        <FormControl 
                            id='email' 
                            type='email' 
                            placeholder='Email Address' 
                            required
                            onChange={this.handleChange}/>
                            <br />
                        <FormControl 
                            id='password' 
                            type='password' 
                            placeholder ='Password' 
                            required
                            onChange={this.handleChange}/>
                            <br />
                        <FormControl 
                            id='passwordConfirm' 
                            type='password' 
                            placeholder ='Password Confirm' 
                            required
                            onChange={this.handleChange}/>
                            <br />                                                
                        <Button bsStyle="primary" type='submit'>Sign Up!</Button>
                        <div id='errorMessage'>{this.state.errorMessage}</div>
                </Form>
                </Col>
            </Col>
        </Row>
        )
    }
}

export default withRouter(SignUp);