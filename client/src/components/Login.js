import React from 'react'

//Input fields
//Validation

//Hash Salt Capability
//Local Storage of Token Save
//Redirect to Profile

class Login extends React.Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            token: ''
        }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    setToken(result) {
        this.setState({token: result.token})
    }

    handleSubmit(event) {
        event.preventDefault()
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(this.state)
            })
            .then(response => response.json())
            .then(result => this.setToken(result))
    }

    render(){
        return(
            <div className='Login'>
                <form onSubmit={this.handleSubmit}>
                <h1>Login</h1>
                    <input 
                        id='username' 
                        type='text' 
                        placeholder='Username'
                        required 
                        onChange={this.handleChange}/>
                        <input 
                        id='password' 
                        type='password' 
                        placeholder='Password'
                        required 
                        onChange={this.handleChange}/>
                        <div id='errorMessage'>{this.state.errorMessage}</div>
                        <button
                        type='submit'>
                        Login</button>
                    </form>
            </div>
        )
    }
}

export default Login