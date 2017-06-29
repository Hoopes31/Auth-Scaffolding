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
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    validateForm(stateData) {
        //Validation currently fucks up if you enter the wrong password in pass confirm
        //Figure out why its not working.
        var passwordTest = this.state.password.toString()
        var passwordTestConfirm = this.state.passwordConfirm.toString()
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
        else if (!this.state.password || this.state.password.length < 8) {
            document.getElementById('password').setCustomValidity('Passwords must be at least 8 characters long')
            return false
        }
        else if (passwordTest != passwordTestConfirm) {
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
        this.validateForm()
        if(!this.validateForm(this.state)) {
            return 
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
            console.log(`${JSON.stringify(this.state)}`)
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