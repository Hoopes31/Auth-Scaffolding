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
            errorMessage: ''
        }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        /*
        //if the form is correct send api!
        if (this.validateForm) {
            false console.log('Error' message)
        } else {
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(this.state)
            })
        }
        */
        this.validateForm()
    }

    validateForm () {
        console.log('Validating')         

        if(this.state.password.length <= 8) {
            console.log('password is too short')
            this.setState({errorMessage: 'password is too short'})
        }
        else if (this.state.password !== this.state.username) {
            console.log('passwords don\'t match')
            this.setState({errorMessage: 'passwords do not match'})
        }
        else {
            console.log('passed validation')
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