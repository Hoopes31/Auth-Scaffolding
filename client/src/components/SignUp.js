import React from 'react'

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
            authToken: '',
            errorMessage: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
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
            fetch('/api/signUp', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password,
                })
            })
            .then(response => response.json())
            .then(result => console.log(result))
        }
    }
    setToken(result) {
        this.setState({
            authToken: result
        })
    }
    validateForm () {

        //build username validator
        console.log('Validating')         

        if(this.state.password.length <= 8) {
            console.log('password is too short')
            this.setState({errorMessage: 'password is too short'})
            return false
        }
        else if (this.state.password !== this.state.passwordConfirm) {
            console.log('passwords don\'t match')
            this.setState({errorMessage: 'passwords do not match'})
            return false
        }
        else {
            console.log('passed validation')
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