import React from 'react'

class SignUp extends React.Component {
    constructor(){
        super()
        this.state = {
            username: false,
            firstName: false,
            lastName: false,
            email: false,
            password: false,
            passwordConfirm: false
        }
    }
    validateForm(stateData) {
        if (!this.state.username) {
            return false
        }
        else if (!this.state.firstName) {
            return false
        }
        else if (!this.state.lastName) {
            return false
        }
        else if (!this.state.email) {
            return false
        }
        else if (!this.state.password) {
            return false
        }
        else if (this.state.password != this.state.passwordConfirm) {
            document.getElementById('passwordConfirm').setCustomValidity('Passwords don\'t match')
        }
        else {
            return true
        }               
    }
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        if(!this.validateForm(this.state)) {
            return 
        }
        else {
            fetch('/api/signUp'), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }
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
            </form>
        </div>
        )
    }
}

export default SignUp