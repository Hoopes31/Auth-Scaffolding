import React from 'react'
import setHeader from './shared/setHeader'

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
        if(!this.validateForm()) {
        }
        else {
            const body = JSON.stringify({
                    username: this.state.username,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password,
            })

            fetch('/api/signUp', setHeader('POST', '', body))
            .then(response => response.json())
            .then(response => {
                if (!response.err) {
                    this.setToken(response.token)
                    return response.token
                }
                else {
                    return this.setState({errorMessage: response.err})
                }
            })
            .then(response => {this.props.history.push('/profile')})
            .catch(error => this.setState({errorMessage: error}))
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
        <div className='SignUp'>               
            <h1>Sign Up!</h1>
            <form onSubmit={this.handleSubmit}>
                    <input 
                        id='username' 
                        type='text' 
                        placeholder='Username'
                        required 
                        onChange={this.handleChange}/>
                    <input 
                        id='firstName' 
                        type='text' 
                        placeholder='First Name' 
                        required
                        onChange={this.handleChange}/>
                    <input 
                        id='lastName' 
                        type='text' 
                        placeholder ='Last Name' 
                        required
                        onChange={this.handleChange}/>
                    <input 
                        id='email' 
                        type='email' 
                        placeholder='Email Address' 
                        required
                        onChange={this.handleChange}/>
                    <input 
                        id='password' 
                        type='password' 
                        placeholder ='Password' 
                        required
                        onChange={this.handleChange}/>
                    <input 
                        id='passwordConfirm' 
                        type='password' 
                        placeholder ='Password Confirm' 
                        required
                        onChange={this.handleChange}/>                                                
                <button 
                    type='submit'>
                    Sign Up!</button>
                <div id='errorMessage'>{this.state.errorMessage}</div>
            </form>
        </div>
        )
    }
}

export default SignUp