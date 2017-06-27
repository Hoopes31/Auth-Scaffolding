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
            gardin: ''
        }
    }
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0
    }
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        fetch('/api/signUp'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
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
                        onChange={this.handleChange}/>
                    <input 
                        id='firstName' 
                        type='text' 
                        placeholder='First Name' 
                        onChange={this.handleChange}/>
                    <input 
                        id='lastName' 
                        type='text' 
                        placeholder ='Last Name' 
                        onChange={this.handleChange}/>
                    <input 
                        id='email' 
                        type='email' 
                        placeholder='Email Address' 
                        onChange={this.handleChange}/>
                    <input 
                        id='password' 
                        type='password' 
                        placeholder ='Password' 
                        onChange={this.handleChange}/>
                    <input 
                        id='gardin' 
                        type='text' 
                        placeholder='Gardin ID' 
                        onChange={this.handleChange}/>                                                
                <button 
                    disabled={ ! this.validateForm()}
                    type='submit'>
                    Sign Up!</button>
            </form>
        </div>
        )
    }
}

export default SignUp