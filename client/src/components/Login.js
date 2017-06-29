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
            password: ''
        }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        /*
        //if the form is correct send api!
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(this.state)
            })
            */
        this.validateForm()
    }

    validateForm (e) {

        //Validation currently fucks up if you enter the wrong password in pass confirm
        //Figure out why its not working.

        let usernameTest = document.getElementById('username')
        let passwordTest = document.getElementById('password')

        if (!this.state.username || this.state.password.length < 8) {
            usernameTest.setCustomValidity('Passwords must be at least 8 characters long')
            return false
        }
        else if (this.state.username != this.state.password) {
            passwordTest.setCustomValidity('Passwords don\'t match')
            return false
        }
        else {
            return true
        }               
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
                        <button
                        type='submit'>
                        Login</button>
                    </form>
            </div>
        )
    }

}

export default Login